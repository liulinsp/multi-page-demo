<template>
  <div class="not-found">
    <icon name="cry" width="1em" height="1em" class="nodata-icon"></icon>
    <div class="desc">{{message}}</div>
  </div>
</template>
<script>
export default {
  name: 'notFound',
  props: {
    message: {
      type: String,
      default: '没有查到任何数据哦~'
    }
  }
}
</script>

<style lang="scss" scoped>
.not-found{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  color: #999;
  background-color: #F9F9F9;
  padding-top: 42px;
  .nodata-icon{
    font-size: 86px;/*yes*/
  }
  .desc{
    padding-top: 12px;
    font-size: 28px;
  }
}
</style>
