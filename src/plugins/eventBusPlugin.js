/**
 * 全局事件总线
 * 1. 监听事件
 * vm.$eventBus.$on('myEvent', () => {})
 * 2. 触发事件
 * vm.$eventBus.$emit('myEvent')
 * @author liu_lin_sp@126.com
 * @date 2018/7/3
 */
import Vue from 'vue'
export default {
  install () {
    Vue.prototype.$eventBus = new Vue()
  }
}
