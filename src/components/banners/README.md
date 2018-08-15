# 轮播图组件
### 属性
##### 1. bannerList 数据数组
* 数组中存放轮播图片的信息
* 对象包含两个属性，src 和 link
    * src 的值为图片地址
    * link 的值为点击图片打开链接的地址
##### 2. speed 动画时长
* 单位：毫秒
* 默认值：300
##### 3. interval 轮播间隔时间
* 单位：毫秒
* 默认值：3000
##### 4. defaultIndex 初始显示的轮播图的索引
默认值： 0

### 示例

```
<template>
  <div class="banners-demo">
    <banners :bannerList="imgList" :speed="1000" :interval="5000" :defaultIndex="2"></banners>
  </div>
</template>
<script>
import Banners from '@/components/banners/index.vue'
export default {
  name: 'bannersDemo',
  data () {
    return {
      imgList: [
        {
          src: '/static/img/banner1.png',
          link: 'http://www.baidu.com'
        },
        {
          src: '/static/img/banner2.gif',
          link: 'http://www.hao123.com'
        },
        {
          src: '/static/img/banner3.jpg'
        }
      ]
    }
  },
  methods: {},
  components: {
    Banners
  }
}
</script>
<style lang="scss" scoped>
.banners-demo{
  width: 700px;
  height: 400px;
  margin: 30px auto 0;
}
</style>

```

