<template>
  <div class="switch-bar" :class="statusClass" @click="doSwitch">
    <div class="switch-handle"></div>
  </div>
</template>
<script>
export default {
  name: 'BaseSwitch',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      currentValue: this.value
    }
  },
  computed: {
    statusClass () {
      return this.currentValue ? 'on' : ''
    }
  },
  watch: {
    value (val) {
      this.currentValue = val
    }
  },
  methods: {
    doSwitch () {
      this.currentValue = !this.currentValue
      this.$emit('input', this.currentValue)
      this.$emit('change', this.currentValue)
    }
  }
}
</script>
<style lang="scss" scoped>
$bar-width: 100px;
$bar-height: 60px;
$bar-padding: 6px;
.switch-bar{
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  width: $bar-width;
  height: $bar-height;
  padding: 0 $bar-padding;
  border: 1px solid #E6E6E6;
  border-radius: $bar-height / 2;
  transition: all 0.3s ease-in-out;
  .switch-handle{
    background-color: #F5F5F5;
    width: $bar-height - $bar-padding * 2;
    height: $bar-height - $bar-padding * 2;
    border-radius: 50%;
    transition: all 0.3s ease-in-out;
  }
}
.on{
  background-color: #00AAFF;
  .switch-handle{
    background-color: #FFF;
    transform: translateX($bar-width - $bar-height);
  }
}
</style>
