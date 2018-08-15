<template>
  <div ref="wrapper" class="scroll-wrapper" :style="wrapperStyle">
    <div class="scroll-content" :style="contentStyle" ref="content">
      <slot></slot>
      <div class="tip-msg" v-show="showTip">
        <pulling-word v-show="!inPullUp&&dataList.length>0" :loadingWord="beforePullUpWord" ></pulling-word>
        <loading v-if="inPullUp" :loadingWord='PullingUpWord'></loading>
      </div>
    </div>

    <transition name="pulldown">
      <loading class="pulldown" v-if="inPullDown" :loadingWord='PullingDownWord'></loading>
    </transition>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Loading from './loading.vue'
import PullingWord from './pullingWord.vue'
import * as CONSTANT from './constant'

const PullingUpWord = CONSTANT.LOADING_TIP
const beforePullUpWord = CONSTANT.LOADING_MORE
const PullingDownWord = CONSTANT.LOADING_MSG

export default {
  name: 'scrollWrapper',
  props: {
    /**
     * 列表的数据
     */
    dataList: {
      type: Array,
      default: function () {
        return []
      }
    },
    /**
     * 1 滚动的时候会派发scroll事件，会截流。
     * 2 滚动的时候实时派发scroll事件，不会截流。
     * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
     */
    probeType: {
      type: Number,
      default: 3
    },
    /**
     * 点击列表是否派发click事件
     */
    click: {
      type: Boolean,
      default: true
    },
    /**
     * 是否开启横向滚动
     */
    scrollX: {
      type: Boolean,
      default: false
    },
    /**
     * 是否开启纵向滚动
     */
    scrollY: {
      type: Boolean,
      default: true
    },
    /**
     * 是否派发滚动事件
     */
    listenScroll: {
      type: Boolean,
      default: false
    },
    /* 是否显示滚动条 */
    scrollbar: {
      type: Boolean,
      default: true
    },
    /* 是否显示回弹动画 */
    bounce: {
      type: [Boolean, Object],
      default: true
    },
    /**
     * 是否派发顶部下拉的事件，用于下拉刷新
     */
    pullDownRefresh: {
      type: null,
      default: false
    },
    /**
     * 这个配置用于做上拉加载功能，默认为 false。当设置为 true 或者是一个 Object 的时候，
     * 可以开启上拉加载，可以配置离底部距离阈值（threshold）来决定开始加载的时机
     */
    pullUpLoad: {
      type: null,
      default: false
    },
    /**
     * 是否派发列表滚动开始的事件
     */
    beforeScroll: {
      type: Boolean,
      default: false
    },
    /**
     * 当数据更新后，刷新scroll的延时。
     */
    refreshDelay: {
      type: Number,
      default: 20
    },
    /**
     * 包裹器背景色（上拉、下拉漏出的底色）
     */
    wrapperBgColor: {
      type: String,
      default: '#F9F9F9'
    },
    /**
     * 内容区域背景色
     */
    contentBgColor: {
      type: String,
      default: '#fff'
    },
    /**
     * 重新初始化滚动条事件的ID
     */
    eventId: {
      type: String,
      default: null
    },
    /**
     * 保留原生的滚动的方向，可选值：'vertical'、'horizontal'
     */
    eventPassthrough: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      scroll: null,
      inPullUp: false,
      inPullDown: false,
      beforePullUpWord,
      PullingUpWord,
      PullingDownWord,
      continuePullUp: true
    }
  },
  computed: {
    showTip () {
      if (this.scroll) {
        return this.scroll.maxScrollY < 0 && this.pullUpLoad
      }
      return false
    },
    wrapperStyle () {
      return {backgroundColor: this.wrapperBgColor}
    },
    contentStyle () {
      let contentStyle = {backgroundColor: this.contentBgColor}
      if (this.scrollX) {
        contentStyle.display = 'inline-block'
      }
      return contentStyle
    }
  },
  created () {
    if (this.eventId) {
      this.$eventBus.$on('init-scroll-' + this.eventId, holdPosition => {
        this.initScroll(holdPosition)
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initScroll()
    })
  },
  destroyed () {
    if (this.eventId) {
      this.$eventBus.$off('init-scroll-' + this.eventId)
    }
  },
  methods: {
    /**
     * 初始化滚动条
     * holdPosition 是否保持滚动条的位置，默认为：false, 重新初始化后滚动条在顶部或左侧
     */
    initScroll (holdPosition = false) {
      console.log('initScroll')
      // 自动判断是否需要显示滚动条，当内容高度超过包裹器高度才显示滚动条
      let isScrollFlag = this.scrollbar
      if (this.scrollbar) { // 如果显示滚动条才去判断
        isScrollFlag = this.isNeedScroll()
      }

      // 滚动条的起始位置
      let startX = 0
      let startY = 0
      if (this.scroll) {
        // 是否需要保持滚动条的位置
        if (holdPosition) {
          startX = this.scroll.x
          startY = this.scroll.y
        }
        // 销毁原滚动条，并解绑事件
        this.scroll.destroy()
      }

      // 重新创建滚动条
      this.scroll = new BScroll(this.$refs.wrapper, {
        startX,
        startY,
        scrollX: this.scrollX,
        scrollY: this.scrollY,
        probeType: this.probeType,
        click: this.click,
        pullDownRefresh: this.pullDownRefresh,
        pullUpLoad: this.pullUpLoad,
        scrollbar: isScrollFlag,
        bounce: this.bounce,
        eventPassthrough: this.eventPassthrough
      })
      // 上拉加载
      this.scroll.on('pullingUp', () => {
        if (this.continuePullUp) {
          this.beforePullUp()
          this.$emit('onPullUp', CONSTANT.PULLUP_STATE)
        }
      })
      // 下拉刷新
      this.scroll.on('pullingDown', () => {
        this.beforePullDown()
        this.$emit('onPullDown', CONSTANT.PULLDOWN_STATE)
      })

      // 是否派发滚动事件
      if (this.listenScroll) {
        let me = this
        this.scroll.on('scroll', (pos) => {
          me.$emit('scroll', pos)
        })
      }
    },
    beforePullUp () {
      this.PullingUpWord = PullingUpWord
      this.inPullUp = true
    },
    beforePullDown () {
      this.disable()
      this.inPullDown = true
    },
    finish (type) {
      this['finish' + type]()
      this.enable()
      this['in' + type] = false
    },
    disable () {
      this.scroll && this.scroll.disable()
    },
    enable () {
      this.scroll && this.scroll.enable()
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    finishPullDown () {
      this.scroll && this.scroll.finishPullDown()
    },
    finishPullUp () {
      this.scroll && this.scroll.finishPullUp()
    },
    /* 是否需要显示滚动条 */
    isNeedScroll () {
      let wrapHeight = this.$refs.wrapper.offsetHeight // 获取包裹器的高度
      let contentHeight = this.$refs.content.offsetHeight // 获取滚动内容的高度
      // console.log('wrapHeight=', wrapHeight, ', contentHeight=', contentHeight)
      return wrapHeight < contentHeight
    }
  },
  components: {
    Loading,
    PullingWord
  }
}
</script>
<style lang="scss" scoped>
.scroll-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
}
.scroll-content {
  min-height: 100%;
  &:before {
    content: '';
    display: table;
  }
  &:after {
    content: '';
    display: table;
    clear: both;
  }
}
.pulldown-wrapper {
  position: absolute;
  width: 100%;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all;
}
.pullup-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 0;
}
.pulldown {
  position: absolute;
  top: 0;
  left: 0;
}
.pulldown-enter-active {
  transition: all 0.2s;
}
.pulldown-enter, .pulldown-leave-active {
  transform: translateY(-100%);
  transition: all 0.2s;
}
.tip-msg {
  position: absolute;
  width: 100%;
  text-align: center;
}
</style>
<style>
.bscroll-vertical-scrollbar{
  width: 7px !important;
}
</style>
