<template>
  <DetailShell barTitle="按钮示例">
    <div class="button-demo">
      <c-button @click="clickHandle">默认按钮</c-button><br/>
      <c-button btn-type="primary" @click="clickHandle">primary</c-button><br/>
      <c-button btn-type="disabled" @click="clickHandle">disabled</c-button><br/>
      <c-button btn-size="xs" @click="clickHandle">xs</c-button><br/>
      <c-button btn-size="s" @click="clickHandle">s</c-button><br/>
      <c-button btn-size="m" @click="clickHandle">m</c-button><br/>
      <c-button btn-size="l" @click="clickHandle">l</c-button><br/>
      <c-button btn-size="xl" @click="clickHandle">xl</c-button><br/>
      <c-button @click="clickHandle" btn-class="btn-out">自定义样式</c-button><br/>
      <c-button :disabled="true" @click="clickHandle">不可用</c-button><br/>
    </div>
  </DetailShell>
</template>
<script>
import CButton from '@/components/button/index.vue'
import DetailShell from '@/components/modules/app/DetailShell.vue'
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
    clickHandle (event) {
      let text = event.currentTarget.lastChild.nodeValue
      this.$toast(`点击了“${text}”按钮`)
    }
  }
}
</script>
<style lang="scss" scoped>
.button-demo{
  text-align: center;
  line-height: 120px;
}
button.btn-out{
  width: 360px;
  background-color: #333333;
  border-radius: 20px;
  color: #fff;
}
</style>
