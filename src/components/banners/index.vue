<template>
  <div class="banners-container">
    <ul class="banners-wrap">
      <li class="img-wrap" v-for="(item, index) in bannerList" :key="item.src"
          :class="isStart ? (index === curIndex ? 'show' : 'hide') : ''"
          :style="{animationDuration:speed + 'ms', zIndex: index===defaultIndex ? 1 : 0}"
          @click="linkHandle(item)">
        <img :src="item.src" alt="">
      </li>
    </ul>
    <div class="nav-wrap">
      <b class="nav-index" v-for="(item, index) in bannerList" :key="index" :class="[indexClass, index === curIndex ? 'cur' : '']"></b>
    </div>
  </div>
</template>
<script>
export default {
  name: 'banners',
  props: {
    bannerList: {
      type: Array,
      default: () => []
    },
    // 动画时长（毫秒）
    speed: {
      type: Number,
      default: 300
    },
    // 轮播间隔时间 （毫秒）
    interval: {
      type: Number,
      default: 3000
    },
    // 初始显示的轮播图的索引
    defaultIndex: {
      type: Number,
      default: 0
    },
    // 索引样式：dot(圆点)、line(横线)，默认:dot
    indexType: {
      type: String,
      default: 'dot'
    }
  },
  data () {
    return {
      curIndex: this.defaultIndex,
      intervalId: null,
      isStart: false
    }
  },
  computed: {
    indexClass () {
      return 'nav-' + this.indexType
    }
  },
  mounted () {
    this.intervalId = setInterval(() => {
      this.isStart = true
      let maxIndex = this.bannerList.length - 1
      if (this.curIndex >= maxIndex) {
        this.curIndex = 0
      } else {
        this.curIndex++
      }
    }, this.interval)
  },
  methods: {
    linkHandle (item) {
      if (item.link) {
        window.open(item.link)
      }
    }
  },
  destroyed () {
    clearInterval(this.intervalId)
  }
}
</script>
<style lang="scss" scoped>
$dotSize: 8px;
.banners-container{
  position: relative;
  height: 100%;
}
.banners-wrap{
  position: relative;
  overflow: hidden;
  height: 100%;
  white-space: nowrap;
  background-color: #cdcdcd;
  .img-wrap{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    img{
      width: 100%;
      height: 100%;
    }
    animation-timing-function: ease;
  }
  .show{
    animation-name: show-in;
    // animation: show-in .5s ease-out;
  }
  .hide{
    animation-name: show-out;
    // animation: show-out .5s ease-out;
    transform: translate3d(-100%, 0, 0);
  }
}
.nav-wrap{
  position: absolute;
  bottom: 14px;
  width: 100%;
  text-align: center;
  white-space: nowrap;
  line-height: $dotSize * 2;/*no*/
  z-index: 10;
  .nav-index{
    display: inline-block;
    margin: 0 6px;/*no*/
    vertical-align: middle;
    background-color: rgba(0,0,0,.5);
  }
  .nav-dot{
    width: $dotSize * 2;/*no*/
    height: $dotSize *  2;/*no*/
    border-radius: 50%;/*no*/
  }
  .nav-line{
    margin: 0 4px;/*no*/
    width: 18px;
    height: 2px;/*no*/
  }
  .cur{
    background-color: rgba(255,255,255,.5);
  }
}
[data-dpr='1'] .nav-wrap{
  line-height: $dotSize;/*no*/
  .nav-dot{
    width: $dotSize;/*no*/
    height: $dotSize;/*no*/
  }
}
[data-dpr='3'] .nav-wrap{
   line-height: $dotSize * 3;/*no*/
   .nav-dot{
     width: $dotSize * 3;/*no*/
     height: $dotSize *  3;/*no*/
   }
 }

@keyframes show-in{
  0% {
    transform: translate3d(100%, 0, 0);
  }
  100% {
    transform: translate3d(1px, 0, 0);
  }
}
@keyframes show-out{
  0% {
    transform: translate3d(1px, 0, 0);
  }
  100% {
    transform: translate3d(-100%, 0, 0);
  }
}
</style>
