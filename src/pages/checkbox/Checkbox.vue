<template>
  <DetailShell barTitle="复选组件示例" scrollBgColor="#F9F9F9">
    <div class="checkbox-wrap">
      <Checkbox title="请选择银行:" :options="checkboxOptions" v-model="banks" @change="doChange"></Checkbox>
      <div class="result">选择结果为：{{banks}}</div>
    </div>
  </DetailShell>
</template>
<script>
import DetailShell from '@/components/modules/app/DetailShell.vue'
import Checkbox from '@/components/checkbox/index.vue'
export default {
  name: 'CheckboxDemo',
  components: {
    DetailShell,
    Checkbox
  },
  data () {
    return {
      banks: ['01', '03'],
      checkboxOptions: [
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
.checkbox-wrap{
  font-size: 36px;
  line-height: 90px;
  .result{
    margin-top: 40px;
    padding: 0 40px;
  }
}
</style>
