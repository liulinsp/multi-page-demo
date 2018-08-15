<!-- 翻转组件 -->
<template>
  <div class="card" @click="doSwitch">
    <div class="flip" :class="[frontStatus]" :style="durationStyle">
      <slot name="front"></slot>
    </div>
    <div class="flip" :class="[backStatus]" :style="durationStyle">
      <slot name="back"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Flip',
  props: {
    // 是否反面
    isBack: {
      type: Boolean,
      default: false
    },
    // 动画时长，单位：毫秒
    duration: {
      type: Number,
      default: 325
    },
    // 方向, x：沿x轴方向翻转，y：沿y轴方向翻转
    direction: {
      type: String,
      default: 'y'
    }
  },
  data () {
    let data = {
      backFlag: this.isBack,
      frontStatus: '',
      backStatus: ''
    }

    if (this.isBack) {
      data.frontStatus = 'hidde'
    } else {
      data.backStatus = 'hidde'
    }
    return data
  },
  computed: {
    durationStyle () {
      return {
        animationDuration: `${this.duration}ms`
      }
    }
  },
  watch: {
    backFlag (flag) {
      if (flag) {
        this.frontStatus = 'out-' + this.direction
        setTimeout(() => {
          this.$set(this, 'backStatus', 'in-' + this.direction)
        }, this.duration)
      } else {
        this.backStatus = 'out-' + this.direction
        setTimeout(() => {
          this.$set(this, 'frontStatus', 'in-' + this.direction)
        }, this.duration)
      }
    }
  },
  methods: {
    doSwitch () {
      this.backFlag = !this.backFlag
      this.$emit('flip', this.backFlag)
    }
  }
}
</script>
<style lang="scss" scoped>
.card, .flip{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.flip{
  backface-visibility: hidden;
  transform: translateX(0);
}
.in-x {
  animation-name: flipintobottom;
  // animation-duration: 325ms;
  animation-timing-function: ease-out;
}
.out-x {
  transform: rotateX(-90deg) scale(.9);
  animation-name: flipouttotop;
  animation-timing-function: ease-in;
  // animation-duration: 325ms;
}
.in-y {
  animation-name: flipintoright;
  // animation-duration: 325ms;
  animation-timing-function: ease-out;
}
.out-y {
  transform: rotateY(-90deg) scale(.9);
  animation-name: flipouttoleft;
  animation-timing-function: ease-in;
  // animation-duration: 325ms;
}
@keyframes flipouttoleft {
  from { transform: rotateY(0); }
  to { transform: rotateY(-90deg) scale(.9); }
}
@keyframes flipintoright{
  from { transform: rotateY(90deg) scale(.9); }
  to { transform: rotateY(0); }
}
@keyframes flipouttotop {
  from { transform: rotateX(0); }
  to { transform: rotateX(-90deg) scale(.9); }
}
@keyframes flipintobottom{
  from { transform: rotateX(90deg) scale(.9); }
  to { transform: rotateX(0); }
}
.hidde{
  opacity: 0;
}
</style>
