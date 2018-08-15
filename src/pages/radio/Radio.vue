<template>
  <DetailShell barTitle="单选组件示例" scrollBgColor="#F9F9F9">
    <div class="radio-wrap">
      <Radio title="请选择银行:" :options="radioOptions" v-model="bank" @change="doChange"></Radio>
      <div class="result">选择结果为：{{bank}}</div>
    </div>
  </DetailShell>
</template>
<script>
import DetailShell from '@/components/modules/app/DetailShell.vue'
import Radio from '@/components/radio/index.vue'
export default {
  name: 'RadioDemo',
  components: {
    DetailShell,
    Radio
  },
  data () {
    return {
      bank: '03',
      radioOptions: [
        { value: '01', text: '工商银行' },
        { value: '02', text: '建设银行' },
        { value: '03', text: '中国银行' },
        { value: '04', text: '农业银行' },
        { value: '05', text: '天地银行', disabled: true }
      ]
    }
  },
  methods: {
    doChange (val) {
      console.log('触发change事件，value = ', val)
    }
  }
}
</script>
<style lang="scss" scoped>
.radio-wrap{
  font-size: 36px;
  line-height: 90px;
  .result{
    margin-top: 40px;
    padding: 0 40px;
  }
}
</style>
