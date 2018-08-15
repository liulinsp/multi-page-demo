<template>
  <DetailShell barTitle="弹出窗口示例" scrollBgColor="#F9F9F9" >
    <div class="popup-demo" ref="popupDemo">
      <CButton @click="doOpen(1)">简单提示</CButton><br/>
      <CButton @click="doOpen(2)">自定义内容提示</CButton><br/>
      <CButton @click="doOpen(3)">内容带滚动条提示</CButton><br/>
      <CButton @click="doOpen(4)">带按钮的提示</CButton><br/>
      <CButton @click="doOpen(5)">确认提示</CButton><br/>
      <CButton @click="doJSOpen()">脚本方式调用</CButton><br/>
    </div>
    <Popup v-model="isShow1" title="提示信息" message="已修改成功"></Popup>
    <Popup v-model="isShow2" title="提示信息" :width="460" :height="380">
      <div class="popup2-content">
        <p><icon name="cry" class="popup2-icon"></icon></p>
        <p>修改失败了</p>
      </div>
    </Popup>
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
    <BaseAlert v-model="isShow4" message="保存成功" btnText="继续" @ok="doOK"></BaseAlert>
    <BaseConfirm v-model="isShow5" message="确定删除订单？" @ok="doOK" @cancel="doCancel"></BaseConfirm>
  </DetailShell>
</template>
<script>
import DetailShell from '@/components/modules/app/DetailShell.vue'
import Popup from '@/components/popup/Popup.vue'
import BaseAlert from '@/components/popup/Alert.vue'
import BaseConfirm from '@/components/popup/Confirm.vue'
import CButton from '@/components/button/index.vue'

import popup from '@/components/popup/index.js'
export default {
  name: 'PopupDemo',
  components: {
    DetailShell,
    Popup,
    BaseAlert,
    BaseConfirm,
    CButton
  },
  data () {
    return {
      isShow1: false,
      isShow2: false,
      isShow3: false,
      isShow4: false,
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
    },
    doJSOpen () {
      popup({title: '提示', message: '保存成功！', width: 500, height: 300, parentElement: this.$refs.popupDemo})
    }
  }
}
</script>
<style lang="scss" scoped>
.popup-demo{
  padding: 40px;
  button{
    margin: 10px 0;
  }
}
.popup2-content{
  font-size: 32px;
  text-align: center;
  .popup2-icon{
    font-size: 160px;/*yes*/
    color: #1e90ff;
    margin-bottom: 10px;
  }
}
.popup3-content{
  padding: 30px;
  font-size: 36px;
  line-height: 90px;
}
</style>
