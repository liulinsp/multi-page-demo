# 复选框组件
#### 属性
##### 1. title
* 复选框组的标题
* 值为字符串类型
##### 2. options
* 复选项目数组
* 必填
> 数组中对象示例：{ value: ‘01’， text: '书'， disabled：false}
> * value： 值
> * text： 显示的文字
> * disabled: 是否可用
##### 3. value
* 当前选中值
* 值为数组类型

### 示例
```vue
<template>
  <div class="checkbox-wrap">
    <Checkbox title="请选择银行:" :options="checkboxOptions" v-model="banks" @change="doChange"></Checkbox>
    <div class="result">选择结果为：{{banks}}</div>
  </div>
</template>
<script>
import Checkbox from '@/components/checkbox/index.vue'
export default {
  name: 'CheckboxDemo',
  components: {
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
```
