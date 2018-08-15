<template>
  <DetailShell barTitle="开关组件示例" scrollBgColor="#F9F9F9">
    <div class="switch-list">
      <div class="item">
        <span>开启系统通知</span>
        <BaseSwitch v-model="openSysMsg"></BaseSwitch>
      </div>
      <div class="item">
        <span>开启短息提醒</span>
        <BaseSwitch v-model="openSMS"></BaseSwitch>
      </div>
      <div class="item">
        <span>开启提示声音</span>
        <BaseSwitch v-model="openSound"></BaseSwitch>
      </div>
    </div>
  </DetailShell>
</template>
<script>
import DetailShell from '@/components/modules/app/DetailShell.vue'
import BaseSwitch from '@/components/switch/index.vue'
export default {
  name: 'SwitchDemo',
  components: {
    DetailShell,
    BaseSwitch
  },
  data () {
    return {
      openSysMsg: false,
      openSMS: true,
      openSound: false
    }
  }
}
</script>
<style lang="scss" scoped>
.switch-list{
  font-size: 28px;
  .item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 110px;
    padding: 0 40px;
    font-size: 32px;
    background-color: #FFF;
    &:not(:last-of-type){
      border-bottom: solid 1px $list-border-color;
    }
  }
}
</style>
