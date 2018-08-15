<template>
  <div class="loading"><img src="./img/loading.gif" alt=""><span>{{loadingWord}}</span></div>
</template>

<script>
export default {
  name: 'loading',
  props: {
    loadingWord: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.loading{
  text-align: center;
  z-index: 100;
  width: 690px;
  height: 100px;
  line-height: 100px;
  margin-left: 30px;
  img{
    width: 0.65rem;
    height: 0.65rem;
    vertical-align: middle;
  }
  span {
    vertical-align: middle;
    margin-left: 0.14rem;
    font-size: 30px;
    color: #000;
  }
}
</style>
