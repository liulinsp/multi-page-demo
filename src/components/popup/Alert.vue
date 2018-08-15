<template>
  <BasePopup v-model="visible" :message="message" :showClose="showClose"
    :width="width" :height="height" :scroll="scroll">
    <div slot="bottom" class="buttons">
      <BaseButton @click="doOK" btnType="primary" :btnText="btnText"></BaseButton>
    </div>
  </BasePopup>
</template>
<script>
import BasePopup from './Popup.vue'
import BaseButton from '@/components/button/index.vue'
export default {
  name: 'BaseAlert',
  components: {
    BasePopup,
    BaseButton
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
      default: false
    },
    // 消息内容
    message: String,
    // 弹框宽度，按750 * 1344的设计稿自动计算
    width: {
      type: Number,
      default: 500
    },
    // 弹框高度，按750 * 1344的设计稿自动计算
    height: {
      type: Number,
      default: 340
    },
    // 内容区域是否需要滚动条
    scroll: {
      type: Boolean,
      default: false
    },
    // 按钮文字
    btnText: {
      type: String,
      default: '确定'
    }
  },
  data () {
    return {
      // 是否显示
      visible: this.value
    }
  },
  watch: {
    value (val) {
      this.visible = val
    }
  },
  methods: {
    doOK () {
      this.visible = false
      this.$emit('input', this.visible)
      this.$emit('ok')
    }
  }
}
</script>
<style lang="scss" scoped>
.buttons{
  padding: 10px 40px;
}
</style>
