/**
 * 生产环境默认jsBridge对象
 * @author liu_lin_sp@126.com
 * @date 2018/4/17
 */
'use strict'

export default {
  name: 'pro-jsbridge',
  /**
   * jsbridge是否为默认对象，如果是说明jsbridge未成功注册
   */
  isDefault: true,
  init () {
    console.warn(`JSBidge没有注册成功！初始化`)
  },
  send (msg) {
    console.warn(`JSBidge没有注册成功！发送消息：${msg}`)
  },
  registerHandler (name, callback) {
    console.warn(`JSBidge没有注册成功！注册事件: ${name}`)
  },
  callHandler (name, params, callback) {
    console.warn(`JSBidge没有调用成功！调用事件: ${name}`)
  }
}
