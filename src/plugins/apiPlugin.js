/**
 * 后台接口插件
 * @author liu_lin_sp@126.com
 * @date 2018/7/3
 */
import Vue from 'vue'
import api from '@/assets/js/api.js'
export default{
  install () {
    Vue.prototype.$api = api
  }
}
