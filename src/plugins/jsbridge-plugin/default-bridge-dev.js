/**
 * 开发环境默认jsBridge对象
 * @author liu_lin_sp@126.com
 * @date 2018/4/17
 */
'use strict'

import callMocks from './call-mocks'
export default {
  name: 'dev-jsbridge',
  /**
   * jsbridge是否为默认对象，如果是说明jsbridge未成功注册
   */
  isDefault: true,
  init () {
    console.log(`JSBridge初始化`)
  },
  send (msg) {
    console.log(`JSBridge发送消息：${msg}`)
  },
  registerHandler (name, callback) {
    console.log(`注册JSBridge事件: ${name}`)
  },
  callHandler (name, params, callback) {
    if (callMocks[name]) {
      let result = callMocks[name](params)
      callback(result)
      console.log('调用JSBridge方法:', name, '\n参数为：', params, '\n结果为：', result)
    }
  }
}
