<template>
  <div id="home">
    <h2>首页</h2>
    <icon name="smile"></icon>
  </div>
</template>
<script>
export default {
  created () {
    /* this.$jsBridge.registerHandler(
      this.$jsBridgeCmd.R_SET_ID,
      (data) => {
        console.log('登录结果：', data)
      }
    ) */
  },
  mounted () {

  },
  methods: {
    /* callJSBridge () {
      this.$jsBridge.callHandler(
        this.$jsBridgeCmd.R_TEST,
        {username: 'zhangsan', password: '123456'},
        (data) => {
          console.log('登录结果：', data)
          this.$router.push('/ertyuio')
        }
      )
    } */
  }
}
</script>
<style lang="scss" scoped>
  #home{
    width: 375px;
    background-color: dodgerblue;
  }
  .fa-icon{
    width: auto;
    height: 3em;
    /* 要在 Safari 中正常工作，需要再引入如下两行代码 */
    max-width: 100%;
    max-height: 100%;
    color: chartreuse;
  }
</style>
