<template>
<div class="detail-shell">
  <div class="detail-head">
    <AppTitleBar @back="doBack">{{barTitle}}</AppTitleBar>
  </div>
  <div v-if="scroll" class="detail-content">
    <scroll :bounce="false" eventPassthrough="horizontal" :event-id="scrollId" :contentBgColor="scrollBgColor">
      <slot></slot>
    </scroll>
  </div>
  <div v-else class="detail-content">
    <slot></slot>
  </div>
</div>
</template>
<script>
import Scroll from '@/components/scroll/Scroll'
import AppTitleBar from './AppTitleBar.vue'
export default {
  name: 'DetailShell',
  components: {
    Scroll,
    AppTitleBar
  },
  props: {
    // 标题
    barTitle: String,
    // 是否需要滚动条
    scroll: {
      type: Boolean,
      default: true
    },
    // 滚动内容背景色
    scrollBgColor: {
      type: String,
      default: '#FFF'
    },
    // 滚动条ID
    scrollId: String
  },
  methods: {
    doBack () {
      // window.history.back()
      window.location.href = '/'
    }
  }
}
</script>
<style lang="scss" scoped>
.detail-shell{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .detail-head{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: $app-header-height;
    z-index: 9;
  }
  .detail-content{
    position: absolute;
    top: $app-header-height;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
