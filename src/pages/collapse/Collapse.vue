<template>
  <DetailShell barTitle="折叠示例">
    <div class="collapse">
      <div class="switch-bar" @click="clickHandle">{{isCollapse?'展开':'收起'}}</div>
      <collapse :value="isCollapse" :duration="500" :noEnter="false" :noLeave="false">
        <div class="content">
          <h1>1111111</h1>
          <h1>2222222</h1>
          <h1>3333333</h1>
        </div>
      </collapse>
    </div>
  </DetailShell>
</template>
<script>
import DetailShell from '@/components/modules/app/DetailShell.vue'
import Collapse from '@/components/collapse/index.vue'
export default {
  name: 'CollapseDemo',
  components: {
    DetailShell,
    Collapse
  },
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    clickHandle () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>
<style lang="scss" scoped>
.collapse{
  width: 400px;
  margin: 0 auto;
  padding: 50px;
  .switch-bar{
    text-align: center;
    font-size: 38px;
    line-height: 64px;
    border-radius: 16px;
    border: solid 1px #999999;
  }
  .content{
    margin-top: 20px;
    background-color: #d8f2ff;
    padding: 20px;
    text-align: center;
  }
}
</style>
