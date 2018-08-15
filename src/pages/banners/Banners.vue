<template>
  <DetailShell barTitle="轮播图示例">
    <div class="banners-demo">
      <Banners :bannerList="imgList" :speed="1000" :interval="5000" :defaultIndex="2" indexType="line"></Banners>
    </div>
  </DetailShell>
</template>
<script>
import DetailShell from '@/components/modules/app/DetailShell.vue'
import Banners from '@/components/banners/index.vue'
export default {
  name: 'bannersDemo',
  components: {
    DetailShell,
    Banners
  },
  data () {
    return {
      imgList: [
        {
          src: '/static/img/banner1.png',
          link: 'http://www.baidu.com'
        },
        {
          src: '/static/img/banner2.png',
          link: 'http://www.hao123.com'
        },
        {
          src: '/static/img/banner3.png'
        }
      ]
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.banners-demo{
  width: 700px;
  height: 290px;
  margin: 30px auto 0;
}
</style>
