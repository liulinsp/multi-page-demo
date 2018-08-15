<!-- 弹出窗口组件 -->
<template>
  <div class="popup">
    <transition name="mask">
      <div class="popup-mask" v-show="visible"></div>
    </transition>
    <transition name="pop">
      <div class="popup-box" v-show="visible" :class="className" :style="popupStyle" ref="popBox">
        <div class="close" v-show="showClose" @click="doClose"><icon name="close" class="close-icon"></icon></div>
        <div class="popup-pane">
          <div class="title" v-show="title">{{title}}</div>
          <div class="content">
            <template v-if="!scroll">
              <slot><div class="message">{{message}}</div></slot>
            </template>
            <template v-if="scroll">
              <Scroll :bounce="false" :eventId="scrollEventId">
                <slot><div class="message">{{message}}</div></slot>
              </Scroll>
            </template>
          </div>
          <div class="bottom">
            <slot name="bottom"></slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import Scroll from '@/components/scroll/Scroll.vue'
export default {
  name: 'Popup',
  components: {
    Scroll
  },
  props: {
    // 是否显示弹框
    value: {
      type: Boolean,
      default: false
    },
    // 是否显示关闭按钮
    showClose: {
      type: Boolean,
      default: true
    },
    // 标题
    title: String,
    // 信息内容
    message: String,
    // 弹框宽度，按750 * 1344的设计稿自动计算
    width: {
      type: Number,
      default: 500
    },
    // 弹框高度，按750 * 1344的设计稿自动计算
    height: {
      type: Number,
      default: 300
    },
    // 样式名
    className: {
      type: String,
      default: ''
    },
    // 内容区域是否需要滚动条
    scroll: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 是否显示
      visible: this.value,
      scrollEventId: 'popup' + new Date().getTime()
    }
  },
  computed: {
    // 计算弹框宽高位置相关样式
    popupStyle () {
      let styleObj = {}
      let boxWidth = this.width
      let boxHeight = this.height
      if (window.lib && window.lib.flexible) {
        let flexible = window.lib.flexible
        boxWidth = flexible.rem2px(this.width / 75)
        boxHeight = flexible.rem2px(this.height / 75)
      }
      styleObj.width = boxWidth + 'px'
      styleObj.height = boxHeight + 'px'
      styleObj.marginLeft = `-${boxWidth / 2}px`
      styleObj.marginTop = `-${boxHeight / 2}px`
      return styleObj
    }
  },
  watch: {
    value (val) {
      this.visible = val
    },
    visible (val) {
      if (val && this.scroll) {
        this.$nextTick(() => {
          this.$eventBus.$emit('init-scroll-' + this.scrollEventId)
        })
      }
    }
  },
  methods: {
    doClose () {
      this.visible = false
      this.$emit('input', this.visible)
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss" scoped>
$title-height: 80px;
.popup{
  z-index: 999;
  .popup-mask{
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.5);
    transition: all .3s ease;
  }
  .popup-box{
    position: absolute;
    width: 500px;
    height: 300px;
    top: 50%;
    left: 50%;
    margin-left: -250px;
    margin-top: -150px;
    background-color: #FFF;
    border-radius: 20px;/*yes*/
    transition: all .2s ease;
    .close{
      height: $title-height;
      width: $title-height;
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      .close-icon{
        font-size: 30px;
        color: #666;
      }
    }
    .popup-pane{
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 20px 0;
      .title{
        margin-top: -20px;
        flex: none;
        height: $title-height;
        line-height: $title-height;
        border-bottom: solid 1px #E5E5E5;
        font-size: 32px;
        text-align: center;
        padding: 0 3em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #666;
      }
      .content{
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex: auto;
        overflow: hidden;
        .message{
          padding: 30px 40px 10px;
          box-sizing: border-box;
          font-size: 32px;
        }
      }
      .bottom{
        flex: none;
      }
    }
  }
}

.pop-enter-active, .pop-leave{
  transform: scale(1);
  opacity: 1;
}
.pop-enter, .pop-leave-active{
  transform: scale(.5);
  opacity: 0;
}
.mask-leave-active{
  opacity: 0;
}
</style>
