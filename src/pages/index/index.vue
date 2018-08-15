<template>
  <scroll :bounce="false">
    <div class="index-demo">
      <div class="page-title">组件示例</div>
      <ul class="demo-list">
        <IndexItem link="/scroll.html" text="滚动条" iconName="scroll-bar"></IndexItem>
        <IndexItem link="/button.html" text="按钮" iconName="button"></IndexItem>
        <IndexItem link="/radio.html" text="单选框" iconName="radio"></IndexItem>
        <IndexItem link="/checkbox.html" text="复选框" iconName="checkbox"></IndexItem>
        <IndexItem link="/switch.html" text="开关" iconName="switch"></IndexItem>
        <IndexItem link="/toast.html" text="toast提示" iconName="toast"></IndexItem>
        <IndexItem link="/popup.html" text="弹出窗口" iconName="popup"></IndexItem>
        <IndexItem link="/banners.html" text="轮播图" iconName="banners"></IndexItem>
        <IndexItem link="/collapse.html" text="折叠" iconName="collapse"></IndexItem>
        <IndexItem link="/flip.html" text="翻转" iconName="flip"></IndexItem>
      </ul>
    </div>
  </scroll>
</template>
<script>
import Scroll from '@/components/scroll/Scroll'
import IndexItem from './components/IndexItem.vue'
export default {
  name: 'Index',
  components: {
    Scroll,
    IndexItem
  },
  created () {},
  mounted () {},
  methods: {}
}
</script>
<style lang="scss" scoped>
  .index-demo{
    .page-title{
      height: 120px;
      line-height: 120px;
      background-color: #f9fdff;
      border-bottom: solid 1px $base-border-color;
      font-size: 40px;
      text-align: center;
      color: #000;
    }
  }
</style>
