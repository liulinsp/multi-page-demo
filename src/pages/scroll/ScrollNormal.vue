<template>
  <scroll :scrollbar="true" :bounce="true" wrapperBgColor="#f9f9f9" contentBgColor="#fff" eventId="scrollPageHasImages">
    <div id="articleDetailContent" class="page-content">
      <h1>1</h1>
      <h1>2</h1>
      <h1>3</h1>
      <h1>4</h1>
      <h1>5</h1>
      <h1>6</h1>
      <h1>7</h1>
      <h1>8</h1>
      <h1>9</h1>
      <h1>10</h1>
      <h1>11</h1>
      <h1>12</h1>
      <img src="https://tinypng.com/images/panda-confetti.png" alt=""><br>
      <img src="https://tinypng.com/images/bamboo.png" alt=""><br>
      <img src="https://tinypng.com/images/apng/panda-waving.png" alt=""><br>
    </div>
  </scroll>
</template>
<script>
import Scroll from '@/components/scroll/Scroll'
export default {
  name: 'ScrollNormal',
  components: {
    Scroll
  },
  mounted () {
    this.allImgsLoaded(() => {
      console.log('allImgsLoaded')
      // 通过全局事件总线重新初始化滚动态条，事件名称为‘init-scroll-’ + eventId
      // $emit参数值为true，表示重新初始化时保持滚动条的位置
      this.$eventBus.$emit('init-scroll-scrollPageHasImages', true)
    })
  },
  methods: {
    // 监听所有图片加载完成
    allImgsLoaded (callback) {
      let articleDetail = document.getElementById('articleDetailContent')
      let imgs = articleDetail.getElementsByTagName('IMG')
      if (imgs.length === 0) { return }
      let imgCount = 0
      for (let img of imgs) {
        img.addEventListener('load', () => {
          imgCount++
          if (imgCount >= imgs.length) {
            callback()
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.page-content{
  text-align: center;
}
h1 {
  font-size: 64px;
  line-height: 2;
  text-align: center;
}
</style>
