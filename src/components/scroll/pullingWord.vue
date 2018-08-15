<template>
  <div class="loadingWord">
    <span class="iconfont icon-shangla">{{loadingWord}}</span>
  </div>
</template>

<script>
export default {
  props: {
    loadingWord: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.loadingWord{
  text-align: center;
  z-index: 100;
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  span {
    vertical-align: middle;
    margin-left: 0.14rem;
    font-size: 30px;
    &:before {
      color: #666;
      margin-right: 0.1rem;
    }
  }
}
</style>
