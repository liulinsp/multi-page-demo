<template>
  <div class="app-title-bar">
    <header class="header-wrap">
      <div class="back" @click="backHandler">返回</div>
      <div class="title"><slot>{{ barTitle }}</slot></div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'appTitleBar',
  props: {
    barTitle: String
  },
  data () {
    return {}
  },
  computed: {
  },
  methods: {
    backHandler () {
      this.$emit('back')
    }
  }
}
</script>

<style lang="scss" scoped>
.app-title-bar{
  height: $app-header-height;
  background-color: $dark-color;
  .header-wrap{
    display: flex;
    align-items: center;
    height: 100%;
    font-size: 34px;/*yes*/
    color: #fff;
    .back{
      height: $app-header-height;
      line-height: $app-header-height;
      padding-left: 32px;
      flex: none;
      font-size: 30px;/*yes*/
      text-align: center;
    }
    .title{
      flex: auto;
      padding: 0 4em 0 2em;
      text-align: center;
      vertical-align: middle;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
