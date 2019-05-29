<template>
  <div class="banners-container">
    <div class="banners-wrap" ref="bannersWrap">
      <div class="banner-item" v-for="item in banners" :key="item.src"
           :class="[item.animationClass]"
           :style="item.style"
           @click="linkHandle(item)">
      </div>
    </div>
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
      curIndex: this.defaultIndex, // 当前索引
      intervalId: null, // 定时器ID
      isStart: false, // 是否开始动画
      isReverse: false // 动画是否反向
    }
  },
  computed: {
    indexClass () {
      return 'nav-' + this.indexType
    },
    banners () {
      let list = this.bannerList
      let length = this.bannerList.length
      for (let i = 0; i < length; i++) {
        let animationClass = ''
        let style = {
          animationDuration: this.speed + 'ms',
          backgroundImage: `url('${list[i].src}')`
        }
        if (this.isStart) {
          if (this.isReverse) {
            if (i === this.curIndex) {
              animationClass = 'show-reverse'
            } else if (i === (this.curIndex + 1) % length) {
              animationClass = 'hide-reverse'
            }
          } else {
            if (i === this.curIndex) {
              animationClass = 'show'
            } else if (i === (this.curIndex === 0 ? length - 1 : this.curIndex - 1)) {
              animationClass = 'hide'
            }
          }
        } else {
          if (i === this.curIndex) {
            animationClass = 'cur'
          }
        }
        list[i].animationClass = animationClass
        list[i].style = style
      }
      return list
    }
  },
  mounted () {
    this.intervalId = setInterval(this.start, this.interval)
    this.addListener()
  },
  methods: {
    linkHandle (item) {
      if (item.link) {
        window.open(item.link)
      }
    },
    start () {
      this.isStart = true
      this.isReverse = false
      let maxIndex = this.bannerList.length - 1
      if (this.curIndex >= maxIndex) {
        this.curIndex = 0
      } else {
        this.curIndex++
      }
    },
    onSwipe (direction) {
      if (direction) {
        clearInterval(this.intervalId)
        this.isReverse = direction < 0
        this.curIndex += direction
        let listLength = this.bannerList.length
        if (this.curIndex >= listLength) {
          this.curIndex = 0
        } if (this.curIndex < 0) {
          this.curIndex = listLength - 1
        }
        this.isStart = true
        this.intervalId = setInterval(this.start, this.interval)
      }
    },
    addListener () {
      const bannersWrap = this.$refs.bannersWrap
      bannersWrap.addEventListener('touchstart', this.touchStartHandler)
      bannersWrap.addEventListener('touchmove', this.touchMoveHandler)
      bannersWrap.addEventListener('touchend', this.touchEndHandler)
    },
    touchStartHandler (e) {
      this.startX = e.touches[0].pageX
      this.moveEndX = this.startX
    },
    touchMoveHandler (e) {
      this.moveEndX = e.changedTouches[0].pageX
    },
    touchEndHandler (e) {
      if (this.moveEndX - this.startX > 50) {
        this.onSwipe(-1)
        e.stopPropagation()
      } else if (this.moveEndX - this.startX < -50) {
        this.onSwipe(1)
        e.stopPropagation()
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
  .banner-item{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #000 no-repeat center;
    background-size: cover;
    animation-timing-function: ease-in-out;
    z-index: 0;
  }
  .cur,.show,.show-reverse{
    z-index: 2;
  }
  .hide, .hide-reverse{
    z-index: 1;
  }
  .show{
    animation-name: show-in;
  }
  .hide{
    animation-name: show-out;
    transform: translate3d(-100%, 0, 0);
  }
  .show-reverse{
    animation-name: show-in-reverse;
  }
  .hide-reverse{
    animation-name: show-out-reverse;
    transform: translate3d(100%, 0, 0);
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
@keyframes show-in-reverse{
  0% {
    transform: translate3d(-100%, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes show-out-reverse{
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(100%, 0, 0);
  }
}
</style>
