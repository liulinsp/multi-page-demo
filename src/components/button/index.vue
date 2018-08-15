<template>
  <button class="btn"
          :class='[btnClass, computedType, computedSize]'
          :disabled="disabled" @click="doClick">
    <canvas class="zk-ripple" @click="ripple"></canvas>
    <slot>{{ btnText }}</slot>
  </button>
</template>
<script>
import { getStyle, getStyleNumber } from './utils'
export default {
  name: 'Button',
  props: {
    // 按钮文字
    btnText: {
      type: String,
      default: ''
    },
    // 按钮类型：primary、disabled
    btnType: {
      type: String,
      default: ''
    },
    // 按钮大小：xs、s、m、l、xl、full
    btnSize: {
      type: String,
      default: 'full'
    },
    // 按钮是否可用, 如果为true不触发点击事件
    disabled: {
      type: Boolean,
      default: false
    },
    // 动画速度
    speed: {
      type: Number,
      default: 20
    },
    // 动画透明度
    opacity: {
      type: Number,
      default: 0.4
    },
    // 自定义样式名
    btnClass: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      color: '',
      radius: 0,
      oCanvas: null,
      context: null,
      initialized: false,
      speedOpacity: 0,
      timer: null,
      origin: {}
    }
  },
  computed: {
    // 控制按钮的类型
    computedType: function () {
      if (this.disabled) {
        return 'btn-disabled'
      }
      return this.btnType ? `btn-${this.btnType}` : ''
    },
    // 控制按钮大小尺寸
    computedSize: function () {
      return this.btnSize ? `btn-${this.btnSize}` : ''
    }
  },
  methods: {
    init (el) {
      const oBtn = el.parentElement
      this.color = getStyle(el.parentElement, 'color')
      const w = getStyleNumber(oBtn, 'width')
      // 透明度的速度
      this.speedOpacity = (this.speed / w) * this.opacity
      // canvas 宽和高
      el.width = w
      el.height = getStyleNumber(oBtn, 'height')
      this.context = el.getContext('2d')
    },
    doClick (event) {
      this.$emit('click', event)
    },
    ripple (event) {
      // 清除上次没有执行的动画
      if (this.timer) {
        window.cancelAnimationFrame(this.timer)
      }
      if (this.disabled) return // 不可用时不显示动画
      this.el = event.target
      // 执行初始化
      if (!this.initialized) {
        this.initialized = true
        this.init(this.el)
      }
      this.radius = 0
      // 点击坐标原点
      this.origin.x = event.offsetX
      this.origin.y = event.offsetY
      this.context.clearRect(0, 0, this.el.width, this.el.height)
      this.el.style.opacity = this.opacity
      this.draw()
    },
    draw () {
      this.context.beginPath()
      // 绘制波纹
      this.context.arc(this.origin.x, this.origin.y, this.radius, 0, 2 * Math.PI, false)
      this.context.fillStyle = this.color
      this.context.fill()
      // 定义下次的绘制半径和透明度
      this.radius += this.speed
      this.el.style.opacity -= this.speedOpacity
      // 通过判断半径小于元素宽度或者还有透明度，不断绘制圆形
      if (this.radius < this.el.width || this.el.style.opacity > 0) {
        this.timer = window.requestAnimationFrame(this.draw)
      } else {
        // 清除画布
        this.context.clearRect(0, 0, this.el.width, this.el.height)
        this.el.style.opacity = 0
      }
    }
  },
  destroyed () {
    // 清除上次没有执行的动画
    if (this.timer) {
      window.cancelAnimationFrame(this.timer)
      this.timer = null
    }
  }
}
</script>
<style lang="stylus" scoped>
.btn {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  font-size: 32px;
  line-height: 1.5;
  border-radius: 5px;
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  overflow: hidden;
  position: relative;
  outline: none;
  padding: 10px 20px;
}
.zk-ripple {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
/*.btn:focus, .btn:hover {
  background-color: #0069d9;
  text-decoration: none;
}*/
.btn-primary {
  color: #fff;
  background-color: #0096E0;
  border-color: #0096E0;
}
.btn-primary:hover {
  color: #fff;
  background-color: #0096E0;
  border-color: #0096E0;
}
.btn-primary.disabled, .btn-primary:disabled {
  background-color: #007bff;
  border-color: #007bff;
}
.btn-primary:active {
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
}
.btn-disabled {
  color: #fff;
  background-color: #E5E5E5;
  border-color: #E5E5E5;
}
.btn-xs{
  width: 120px;
  height: 86px;
}
.btn-s{
  width: 200px;
  height: 86px;
}
.btn-m{
  width: 300px;
  height: 86px;
}
.btn-l{
  width: 420px;
  height: 86px;
}
.btn-xl{
  width: 600px;
  height: 86px;
}
.btn-full{
  width: 100%;
  height: 86px;
}
</style>
