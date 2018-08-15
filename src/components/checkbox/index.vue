<template>
  <div class="checkbox-list">
    <div class="checkbox-title">{{title}}</div>
    <div class="checkbox-item" v-for="option in options" :key="option.value" @click="doSelect(option)">
      <input type="checkbox" :id="checkboxName + option.value" :name="checkboxName" v-model="currentValue" :disabled="option.disabled" :value="option.value"/>
      <span class="item-bar">
        <span class="input-span">{{option.text}}</span>
        <span class="input-icon">
          <icon name="tick" class="tick-icon"></icon>
        </span>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Checkbox',
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
    value: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      currentValue: this.value,
      checkboxName: 'checkbox-' + Math.random().toString(36).substring(3, 6)
    }
  },
  watch: {
    value (val) {
      this.currentValue = [...val]
    }
  },
  methods: {
    doSelect (option) {
      if (option.disabled) return
      let value = option.value
      let idx = this.currentValue.indexOf(value)
      if (idx === -1) {
        this.currentValue.push(value)
      } else {
        this.currentValue.splice(idx, 1)
      }
      this.currentValue.sort()
      this.$emit('input', this.currentValue)
      this.$emit('change', this.currentValue)
    }
  }
}
</script>
<style lang="scss" scoped>
.checkbox-list{
  .checkbox-title{
    padding: 0 40px;
    color: #333;
    background-color: #F5F5F5;
  }
  .checkbox-item{
    position: relative;
    padding: 0 40px;
    background-color: #FFF;
    input {
      position: absolute;
      top: 50%;
      left: -100000px;
      width: 1em;
      height: 1em;
      transform: translate(0, -50%);
      font-size: inherit;
      &:checked + .item-bar {
        .input-icon{
          opacity: 1;
        }
      }
      &:disabled + .item-bar {
        .input-span {
          color: #999;
        }
        .input-icon{
          color: #A2A2A2;
        }
      }
    }
    .item-bar{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .input-icon{
        opacity: 0;
        color: #00AAFF;
      }
    }
  }
}
</style>
