# 翻转组件
#### 属性
##### 1. isBack
* 是否显示反面
* 值为布尔类型
* 默认值：false
##### 2. duration
* 动画时长
* 值为数值类型，单位：毫秒
* 默认值：325
##### 3. direction
* 翻转方向
* 值为‘x’或者‘y’
* x：沿x轴方向翻转，y：沿y轴方向翻转
* 默认值：‘y’
#### 插槽
##### 1. front
* 正面内容插槽
##### 2. back
* 反面内容插槽
#### 示例代码
```
<template>
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
</template>
<script>
import Flip from '@/components/flip/index.vue'
export default {
  name: 'FlipDemo',
  components: {
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

```
