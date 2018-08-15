# 一、弹出窗口组件
#### 属性
##### 1. value
* 是否显示弹框
* 值为布尔类型
* 默认值：false
##### 2. showClose
* 是否显示关闭按钮
* 值为布尔类型
* 默认值为true
##### 3. title
* 弹出窗口标题
* 值为字符串
##### 4. message
* 信息内容
* 值为字符串
> 如果有默认插槽则该配置无效
##### 5. width
* 弹出窗口宽度
* 值为数值类型
* 默认值：500
> 值为500时，弹框宽度并不是500像素，而是按750 * 1344的设计稿自动计算rem
##### 6. height
* 弹出窗口宽度
* 值为数值类型
* 默认值：300
> 值为300时，弹框高度并不是500像素，而是按750 * 1344的设计稿自动计算rem
##### 7. className
* 弹框自定义样式名
* 值为字符串
##### 8. scroll
* 内容区域是否需要滚动条
* 值为布尔类型
* 默认值：false

#### 插槽
##### 1. default
* 默认插槽为弹框内容
##### 2. bottom
* 弹框底部插槽，一般用于放操作按钮

### 简单示例
```vue
<template>
  <div class="popup-demo">
    <CButton @click="doOpen(1)">简单提示</CButton>
    <Popup v-model="isShow1" title="提示信息" message="已修改成功"></Popup>
  </div>
</template>
<script>
import CButton from '@/components/button/index.vue'
import Popup from '@/components/popup/Popup.vue'

export default {
  name: 'PopupDemo',
  components: {
    Popup,
    CButton
  },
  data () {
    return {
      isShow1: false
    }
  },
  methods: {
    doOpen (num) {
      this['isShow' + num] = true
    }
  }
}
</script>
```
### 自定义内容示例
```vue
    <Popup v-model="isShow2" title="提示信息" :width="460" :height="380">
      <div class="popup2-content">
        <p><icon name="cry" class="popup2-icon"></icon></p>
        <p>修改失败了</p>
      </div>
    </Popup>
```
### 带滚动条示例
```vue
    <Popup v-model="isShow3" title="银行列表" :width="460" :height="580" :scroll="true">
      <div class="popup3-content">
        <ul>
          <li>中国建设银行</li>
          <li>中国工商银行</li>
          <li>中国农业银行</li>
          <li>中国交通银行</li>
          <li>中国银行</li>
          <li>中国招商银行</li>
          <li>邮政储蓄银行</li>
        </ul>
      </div>
    </Popup>  
```
### 脚本方式创建弹框示例
```vue
<template>
  <div class="popup-demo" ref="popupDemo">
    <button @click="doJSOpen()">脚本方式调用</button>
  </div>
</template>
<script>
import popup from '@/components/popup/index.js'
export default {
  name: 'PopupDemo',
  methods: {
    doJSOpen () {
      popup({
        title: '提示',
        message: '保存成功！',
        width: 500,
        height: 300,
        parentElement: this.$refs.popupDemo})
    }
  }
}
</script>
```
# 二、提示窗口组件（底部有确定按钮）
#### 属性
##### 1. btnText
* 按钮文字
* 值为字符串
* 默认值：‘确定’
> 其他属性同Popup
```vue
<template>
  <div class="popup-demo" ref="popupDemo">
    <CButton @click="doOpen(4)">带按钮的提示</CButton>
    <BaseAlert v-model="isShow4" message="保存成功" btnText="继续" @ok="doOK"></BaseAlert>
  </div>
</template>
<script>
import BaseAlert from '@/components/popup/Alert.vue'
import CButton from '@/components/button/index.vue'

export default {
  name: 'PopupDemo',
  components: {
    BaseAlert,
    CButton
  },
  data () {
    return {
      isShow4: false
    }
  },
  methods: {
    doOpen (num) {
      this['isShow' + num] = true
    },
    doOK () {
      console.log('触发ok事件')
    }
  }
}
</script>
```
# 三、确认窗口组件（底部有确定、取消按钮）
#### 属性
##### 1. okBtnText
* 按钮文字
* 值为字符串
* 默认值：‘确定’
##### 2. cancelBtnText
* 按钮文字
* 值为字符串
* 默认值：‘取消’
> 其他属性同Popup
```vue
<template>
  <div class="popup-demo" ref="popupDemo">
    <CButton @click="doOpen(5)">确认提示</CButton><br/>
    <BaseConfirm v-model="isShow5" message="确定删除订单？" @ok="doOK" @cancel="doCancel"></BaseConfirm>
  </div>
</template>
<script>
import BaseConfirm from '@/components/popup/Confirm.vue'
import CButton from '@/components/button/index.vue'

export default {
  name: 'PopupDemo',
  components: {
    BaseConfirm,
    CButton
  },
  data () {
    return {
      isShow5: false
    }
  },
  methods: {
    doOpen (num) {
      this['isShow' + num] = true
    },
    doOK () {
      console.log('触发ok事件')
    },
    doCancel () {
      console.log('触发cancel事件')
    }
  }
}
</script>
```
