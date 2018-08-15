<template>
  <li class="demo-item">
    <a :href="link">
      <div class="left-info"><icon :name="iconName" class="domo-icon"></icon><span>{{text}}</span></div>
      <div class="right-arrow"><icon name="right-arrow" class="arrow-icon"></icon></div>
    </a>
  </li>
</template>
<script>
export default {
  name: 'IndexItem',
  props: {
    link: String,
    text: String,
    iconName: String
  }
}
</script>
<style lang="scss" scoped>
  .demo-item{
    height: 100px;
    border-bottom: solid 1px $list-border-color;
    font-size: 28px;
    a{
      display:flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      padding: 0 30px;
      .left-info{
        color: $dark-font-color;
        .domo-icon{
          margin-right: 1em;
          font-size: 46px;
          vertical-align: middle;
          color: $base-color;
        }
        span{
          vertical-align: middle;
        }
      }
      .right-arrow{
        color: $light-font-color;
      }
    }
  }
</style>
