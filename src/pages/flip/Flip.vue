<template>
  <DetailShell barTitle="翻转示例">
    <div class="flip-demo">
      <div class="flip-wrap">
        <flip :isBack="true" :duration="350" direction="y">
          <img slot="front" src="./img/card-a.png" alt="">
          <img slot="back" src="./img/card-b.png" alt="">
        </flip>
      </div>
      <div class="flip-wrap">
        <flip :isBack="false" :duration="240" direction="x">
          <img slot="front" src="./img/card-a.png" alt="">
          <img slot="back" src="./img/card-b.png" alt="">
        </flip>
      </div>
    </div>
  </DetailShell>
</template>
<script>
import DetailShell from '@/components/modules/app/DetailShell.vue'
import Flip from '@/components/flip/index.vue'
export default {
  name: 'FlipDemo',
  components: {
    DetailShell,
    Flip
  }
}
</script>
<style lang="scss" scoped>
.flip-demo{
  .flip-wrap{
    position: relative;
    width: 254px;
    height: 440px;
    margin: 60px auto;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
