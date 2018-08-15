<!-- 横向滚动示例 -->
<template>
  <div class="nav-wrap">
    <scroll :scrollbar="false" :scrollX="true" :scrollY="false">
      <ul class="nav">
        <li>推荐</li>
        <li>娱乐</li>
        <li>视频</li>
        <li>生活</li>
        <li>资讯</li>
        <li>时尚</li>
        <li>美妆</li>
        <li>健康</li>
        <li>体育</li>
      </ul>
    </scroll>
  </div>
</template>
<script>
import Scroll from '@/components/scroll/Scroll'
export default {
  name: 'ScrollHorizontal',
  components: {
    Scroll
  }
}
</script>
<style lang="scss" scoped>
$nav-height: 92px;
.nav-wrap{
  position: relative;
  height: $nav-height;
}
.nav{
  display: inline-flex;
  flex-wrap: nowrap;
  height: $nav-height;
  min-width: 750px;
  padding: 0 30px;
  background-color: #f5fffc;
  li {
    line-height: $nav-height;
    font-size: 36px;
    text-align: center;
    white-space: nowrap;
    padding: 0 40px;
  }
}
</style>
