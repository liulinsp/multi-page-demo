# 开关组件
#### 属性
##### 1. value
* 是否打开
* 值为布尔类型
* 默认为：false

### 示例
template:
```
<BaseSwitch v-model="openSysMsg"></BaseSwitch>
```
js:
```
import BaseSwitch from '@/components/switch/index.vue'
export default {
  ...
  components: {
    BaseSwitch
  },
  data () {
    return {
      openSysMsg: false
    }
  }
}
```
