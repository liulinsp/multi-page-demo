<!-- 简单提示信息组件 -->
<template>
  <transition name="toast-pop">
    <div v-show="visible" :class="customClass">
      <span class="text">{{message}}</span>
    </div>
  </transition>
</template>
<script>

export default {
  name: 'Toast',
  props: {
    message: String, // 提示信息内容
    // 样式名
    className: {
      type: String,
      default: ''
    },
    // 位置: top、middle、bottom
    position: {
      type: String,
      default: 'bottom'
    },
    // 提示类型：normal、error
    type: {
      type: String,
      default: 'normal'
    }
  },
  data () {
    return {
      // 是否显示
      visible: false
    }
  },
  computed: {
    // 获取样式
    customClass () {
      let classes = []
      if (this.type === 'error') {
        classes.push('toast-error')
      } else {
        classes.push('toast-normal')
        switch (this.position) {
          case 'top':
            classes.push('is-placetop')
            break
          case 'bottom':
            classes.push('is-placebottom')
            break
          default:
            classes.push('is-placemiddle')
        }
      }
      this.className && classes.push(this.className)
      // console.log('classes=', classes)
      return classes
    }
  }
}
</script>
<style lang="scss" scoped>
.toast-normal {
  position: fixed;
  box-sizing: border-box;
  min-width: 140px;
  max-width: 50%;
  margin-top: 0;
  padding: 24px 40px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  text-align: center;
  z-index: 1000;
  .text {
    display: block;
    font-size: 30px;
    line-height: 1.5;
    text-align: center;
  }
}
.is-placetop {
  top: 50px;
  left: 50%;
  transform: translate(-50%, 0);
}
.is-placemiddle {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.is-placebottom {
  bottom: 50px;
  left: 50%;
  transform: translate(-50%, 0);
}

.is-placetop.toast-pop-enter-active, .is-placetop.toast-pop-leave-active,
.is-placemiddle.toast-pop-enter-active, .is-placemiddle.toast-pop-leave-active {
  transition: opacity .3s linear, margin-top .3s ease;
}

.is-placetop.toast-pop-enter, .is-placetop.toast-pop-leave-to,
.is-placemiddle.toast-pop-enter, .is-placemiddle.toast-pop-leave-to {
  margin-top: 30px;
  opacity: 0;
}
.is-placebottom.toast-pop-enter-active, .is-placebottom.toast-pop-leave-active {
  transition: opacity .3s linear, margin-bottom .3s ease;
}
.is-placebottom.toast-pop-enter, .is-placebottom.toast-pop-leave-to {
  margin-bottom: -30px;
  opacity: 0;
}

.toast-error {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  box-sizing: border-box;
  height: 90px;
  padding: 20px;
  font-size: 28px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  background-color: #FF6668;
  z-index: 1000;
}
.toast-error.toast-pop-enter-active, .toast-error.toast-pop-leave-active{
  transition: opacity .3s ease;
}
.toast-error.toast-pop-enter, .toast-error.toast-pop-leave-to {
  opacity: 0;
}
</style>
