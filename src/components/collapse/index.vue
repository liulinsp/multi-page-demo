<!-- 折叠组件 -->
<template>
  <transition v-on:before-enter="beforeEnter"
              v-on:enter="enter"
              v-on:after-enter="afterEnter"
              v-on:before-leave="beforeLeave"
              v-on:leave="leave"
              v-on:after-leave="afterLeave">
    <div class="collapse-wrap" v-show="!collapseFlag">
      <slot></slot>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'collapse',
  props: {
    // 是否折叠
    value: {
      type: Boolean,
      dafault: false
    },
    // 持续时间（单位：毫秒）
    duration: {
      type: Number,
      default: 300
    },
    // 无进入动画
    noEnter: {
      type: Boolean,
      default: false
    },
    // 无退出动画
    noLeave: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      collapseFlag: this.value
    }
  },
  computed: {
    elTransition () {
      let duration = this.duration
      return `${duration}ms height ease-in-out, ${duration}ms padding-top ease-in-out, ${duration}ms padding-bottom ease-in-out`
    }
  },
  watch: {
    value (val) {
      this.collapseFlag = val
    }
  },
  methods: {
    beforeEnter (el) {
      if (this.noEnter) return
      el.style.transition = this.elTransition
      if (!el.dataset) el.dataset = {}

      el.dataset.oldPaddingTop = el.style.paddingTop
      el.dataset.oldPaddingBottom = el.style.paddingBottom

      el.style.height = 0
      el.style.paddingTop = 0
      el.style.paddingBottom = 0
    },

    enter (el) {
      el.dataset.oldOverflow = el.style.overflow
      if (el.scrollHeight !== 0) {
        el.style.height = el.scrollHeight + 'px'
        el.style.paddingTop = el.dataset.oldPaddingTop
        el.style.paddingBottom = el.dataset.oldPaddingBottom
      } else {
        el.style.height = ''
        el.style.paddingTop = el.dataset.oldPaddingTop
        el.style.paddingBottom = el.dataset.oldPaddingBottom
      }

      el.style.overflow = 'hidden'
    },

    afterEnter (el) {
      el.style.transition = ''
      el.style.height = ''
      el.style.overflow = el.dataset.oldOverflow
    },

    beforeLeave (el) {
      if (!el.dataset) el.dataset = {}
      el.dataset.oldPaddingTop = el.style.paddingTop
      el.dataset.oldPaddingBottom = el.style.paddingBottom
      el.dataset.oldOverflow = el.style.overflow

      el.style.height = el.scrollHeight + 'px'
      el.style.overflow = 'hidden'
    },

    leave (el) {
      if (el.scrollHeight !== 0 && !this.noLeave) {
        el.style.transition = this.elTransition
        el.style.height = 0
        el.style.paddingTop = 0
        el.style.paddingBottom = 0
      }
    },

    afterLeave (el) {
      el.style.transition = ''
      el.style.height = ''
      el.style.overflow = el.dataset.oldOverflow
      el.style.paddingTop = el.dataset.oldPaddingTop
      el.style.paddingBottom = el.dataset.oldPaddingBottom
    }
  }
}
</script>
