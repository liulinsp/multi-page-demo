/**
 * toast提示信息插件
 */
import Vue from 'vue'
import toast from '@/components/toast/index.js'
export default {
  install () {
    Vue.prototype.$toast = toast
  }
}
