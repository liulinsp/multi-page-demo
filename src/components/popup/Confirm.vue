<template>
  <BasePopup v-model="visible" :message="message" :showClose="showClose"
             :width="width" :height="height" :scroll="scroll">
    <div slot="bottom" class="buttons">
      <BaseButton @click="doOK" btnType="primary" :btnText="okBtnText"></BaseButton>
      <BaseButton @click="doCancel" :btnText="cancelBtnText"></BaseButton>
    </div>
  </BasePopup>
</template>
<script>
import BasePopup from './Popup.vue'
import BaseButton from '@/components/button/index.vue'
export default {
  name: 'BaseConfirm',
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
    // 确定按钮文字
    okBtnText: {
      type: String,
      default: '确定'
    },
    // 取消按钮文字
    cancelBtnText: {
      type: String,
      default: '取消'
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
    },
    doCancel () {
      this.visible = false
      this.$emit('input', this.visible)
      this.$emit('cancel')
    }
  }
}
</script>
<style lang="scss" scoped>
  .buttons{
    display: flex;
    padding: 10px 40px;
    >button{
      margin: 0 10px;
    }
  }
</style>
