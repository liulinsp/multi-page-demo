# 单选框组件
#### 属性
##### 1. title
* 单选框组的标题
* 值为字符串类型
##### 2. options
* 单选项目数组
* 必填
> 数组中对象示例：{ value: ‘01’， text: '男'， disabled：false}
> * value： 值
> * text： 显示的文字
> * disabled: 是否可用
##### 3. value
* 当前选中值

### 示例
```vue
<template>
  <div class="radio-wrap">
    <Radio title="请选择银行:" :options="radioOptions" v-model="bank" @change="doChange"></Radio>
    <br><h3>选择结果为：{{bank}}</h3>
  </div>
</template>
<script>
import Radio from '@/components/radio/index.vue'
export default {
  name: 'RadioDemo',
  components: {
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
  padding: 40px;
  font-size: 36px;
  line-height: 60px;
}
</style>
```
