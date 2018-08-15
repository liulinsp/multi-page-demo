/**
 * 模拟jsBridge 调用原生方法
 * @author liu_lin_sp@126.com
 * @date 2018/4/17
 */
'use strict'
import config from '../../../config'
export default {
  testObjcCallback () {
    return 'test'
  },
  getLoginToken () {
    return config.dev.ctx['Token']
  },
  getAppApiVersion () {
    return config.dev.ctx['Api-Version']
  },
  getRequestFrom () {
    return 'IOS'
  },
  // 重新登录
  tokenTimeOut () {
    console.log('JSBridge 重新登录')
  }
}
