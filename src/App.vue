<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
  html, body{
    height: 100%;
    background-color: #E5E5E5;
  }
  #app{
    position: relative;
    width: 10rem;
    height: 100%;
    margin: 0 auto;
    background-color: #FFF;
  }
</style>
