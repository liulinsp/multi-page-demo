<!-- 单选组件 -->
<template>
  <div class="radio-list">
    <div class="radio-title">{{title}}</div>
    <div class="raio-item" v-for="option in options" :key="option.value">
      <label>
        <input type="radio" v-model="currentValue" :disabled="option.disabled" :value="option.value"/>
        <span class="input-box">
          <span class="input-box-circle"></span>
        </span>
        <span class="input-span">{{option.text}}</span>
      </label>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Radio',
  props: {
    // 单选组标题
    title: String,
    /**
     * 单选项目数组
     * 数组中对象示例：{ value: ‘01’， text: '男'， disabled：false}
     *  value： 值
     *  text： 显示的文字
     *  disabled: 是否可用
     **/
    options: {
      type: Array,
      required: true
    },
    // 当前选中值
    value: [String, Number]
  },
  data () {
    return {
      currentValue: this.value
    }
  },
  watch: {
    value (val) {
      this.currentValue = val
    },
    currentValue (val) {
      this.$emit('input', val)
      this.$emit('change', val)
    }
  }
}
</script>
<style lang="scss" scoped>
.radio-list{
  .radio-title{
    padding: 0 40px;
    color: #333;
    background-color: #F5F5F5;
  }
  .raio-item{
    position: relative;
    padding: 0 40px;
    background-color: #FFF;
    label {
      display: flex;
      align-items: center;
      position: relative;
      input {
        position: absolute;
        top: 50%;
        left: 0;
        width: 1em;
        height: 1em;
        transform: translate(0, -50%);
        font-size: inherit;
        opacity: 0;
        &:checked + .input-box > .input-box-circle {
          opacity: 1;
          margin: 22%;
          width: 56%;
          height: 56%;
        }
        &:disabled {
          & + .input-box {
            background-color: #F2F2F2;
            & + .input-span {
              color: #999;
            }
          }
        }
      }
      .input-box {
        display: inline-block;
        border-radius: 50%;
        padding: 0;
        width: 1em;
        height: 1em;
        background: rgba(0, 150, 224, 0.2);
        overflow: hidden;
        user-select: none;
        margin-right: 1em;
        flex: none;
      }
      .input-box-circle {
        display: block;
        margin: 50%;
        width: 0;
        height: 0;
        background: #0096e0;
        border-radius: 50%;
        opacity: 0;
        transition: width 0.15s ease-in, height 0.15s ease-in, margin 0.15s ease-in;
      }
      .input-span{
        display: inline-block;
        color: #666;
      }
    }
  }
}
</style>
