<!--列表滚动条组件-->
<template>
  <scroll id="scroll" ref="scroll" :dataList="dataList" :scrollbar="false"
                  :pullDownRefresh="isPullDownRefresh? DOWN_CONFIG:false"
                  :pullUpLoad="isPullUpLoad? UP_CONFIG:false"
                  @onPullUp="pullUpHandle" @onPullDown="pullDownHandle"
                  :wrapperBgColor = "wrapperBgColor" :contentBgColor="contentBgColor">
    <slot name="list"></slot>
  </scroll>
</template>
<script>
import Scroll from './Scroll.vue'
import {NO_DATA, UP_THRES_SHOLD, DOWN_THRES_SHOLD, STOP} from './constant'

export default {
  name: 'scrollList',
  data () {
    return {
      // 上拉距离多少时执行加载
      UP_CONFIG: {
        threshold: UP_THRES_SHOLD
      },
      DOWN_CONFIG: {
        threshold: DOWN_THRES_SHOLD, // 当下拉到超过顶部 120px 时，触发 pullingDown 事件
        stop: STOP // 刷新数据的过程中，回弹停留在距离顶部还有 100px 的位置
      },
      eventType: '' // 触发事件的类型：PullUp 或者 PullDown
    }
  },
  props: {
    dataList: {
      type: Array,
      default: () => []
    },
    /* 是否开启上拉加载 */
    isPullUpLoad: {
      type: Boolean,
      default: true
    },
    /* 是否开启下拉刷新 */
    isPullDownRefresh: {
      type: Boolean,
      default: true
    },
    /* 包裹器背景色（上拉、下拉漏出的底色) */
    wrapperBgColor: {
      type: String,
      default: '#F9F9F9'
    },
    /* 内容区域背景色 */
    contentBgColor: {
      type: String,
      default: '#fff'
    }
  },
  watch: {
    dataList () {
      this.$nextTick(() => {
        this.$refs.scroll.initScroll()
        if (this.eventType) {
          var type = this.eventType
          setTimeout(() => {
            this.$refs.scroll.finish(type)
          }, 1000)
          this.eventType = ''
        }
      })
    }
  },
  beforeMount () {
    if (window.lib && window.lib.flexible) {
      let flexible = window.lib.flexible
      this.DOWN_CONFIG.threshold = flexible.rem2px(this.DOWN_CONFIG.threshold / 75)
      this.DOWN_CONFIG.stop = flexible.rem2px(this.DOWN_CONFIG.stop / 75)
      this.UP_CONFIG.threshold = flexible.rem2px(this.UP_CONFIG.threshold / 75)
    }
  },
  methods: {
    initScroll () {
      this.$refs.scroll.initScroll()
    },
    // 上拉加载
    pullUpHandle () {
      this.$emit('pullUpEvent')
      this.eventType = 'PullUp'
    },
    // 下拉刷新
    pullDownHandle () {
      this.$emit('pullDownEvent')
      this.eventType = 'PullDown'
    },
    // 修改scroll组件的完成状态
    finish (type) {
      this.$refs.scroll.finish(type)
    },
    noData () {
      this.$refs.scroll.beforePullUpWord = NO_DATA
      this.$refs.scroll.finish('PullUp')
    }
  },
  components: {
    Scroll
  }
}
</script>
<style lang="scss" scoped>
</style>
