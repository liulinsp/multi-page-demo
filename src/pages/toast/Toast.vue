<template>
  <DetailShell barTitle="toast提示示例">
    <div class="toast-demo">
      <c-button @click="defaultHandle">默认提示</c-button><br/>
      <c-button @click="topHandle">顶部提示</c-button><br/>
      <c-button @click="bottomHandle">底部提示</c-button><br/>
      <c-button @click="durationHandle">显示时间1秒</c-button><br/>
      <c-button @click="errorHandle">醒目错误提示</c-button><br/>
      <c-button @click="customHandle">自定义提示样式</c-button><br/>
    </div>
  </DetailShell>
</template>
<script>
import DetailShell from '@/components/modules/app/DetailShell.vue'
import CButton from '@/components/button/index.vue'
export default {
  name: 'bannersDemo',
  components: {
    DetailShell,
    CButton
  },
  data () {
    return {}
  },
  methods: {
    // 默认提示
    defaultHandle (event) {
      let text = event.currentTarget.lastChild.nodeValue
      this.$toast(text)
    },
    // 顶部提示
    topHandle (event) {
      let text = event.currentTarget.lastChild.nodeValue
      this.$toast({position: 'top', message: text})
    },
    // 底部提示
    bottomHandle (event) {
      let text = event.currentTarget.lastChild.nodeValue
      this.$toast({position: 'bottom', message: text})
    },
    // 显示时间1秒
    durationHandle (event) {
      let text = event.currentTarget.lastChild.nodeValue
      this.$toast({duration: 1000, message: text})
    },
    // 醒目错误提示
    errorHandle (event) {
      let text = event.currentTarget.lastChild.nodeValue
      this.$toast({type: 'error', message: text})
    },
    // 自定义提示
    customHandle (event) {
      let text = event.currentTarget.lastChild.nodeValue
      this.$toast({className: 'custom-toast', message: text})
    }
  }
}
</script>
<style lang="scss" scoped>
.toast-demo{
  padding: 40px;
  line-height: 120px;
}
</style>
<style lang="scss">
.custom-toast{
  background-color: $base-color !important;
  color: #FFF !important;
}
</style>
