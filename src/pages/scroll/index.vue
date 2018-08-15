<template>
  <DetailShell barTitle="滚动条示例" :scroll="false">
    <div class="tabs">
      <ul>
        <li><router-link to="/scroll/normal">简单滚动</router-link></li>
        <li><router-link to="/scroll/list">列表滚动</router-link></li>
        <li><router-link to="/scroll/horizontal">横向滚动</router-link></li>
      </ul>
    </div>
    <div class="scroll-pane">
      <router-view></router-view>
    </div>
  </DetailShell>
</template>
<script>
import DetailShell from '@/components/modules/app/DetailShell.vue'
export default {
  name: 'Scroll',
  components: {
    DetailShell
  }
}
</script>
<style lang="scss" scoped>
$navHeight: 90px;
$baseColor: #1e90ff;
.tabs{
  ul{
    display: flex;
    height: $navHeight;
    margin: 0 auto;
    border-bottom: 1px solid #ECECEC;/*no*/
    box-sizing: border-box;
    li{
      flex: 1;
      height: 100%;
      a{
        display: block;
        position: relative;
        width: 100%;
        height: 100%;
        line-height: $navHeight;
        font-size: 28px;
        text-align: center;
        vertical-align: middle;
        box-sizing: border-box;
        background-color: #FFF;
        color: #666;
        &:after{
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 3px;
          background-color:transparent;
        }
        &.active{
          color: $base-color;
          &:after{
            background-color: $base-color;
          }
        }
      }
    }
  }
}

.scroll-pane{
  position: absolute;
  top: $navHeight;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
