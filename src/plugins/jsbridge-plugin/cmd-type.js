/**
 * jsBridge 的事件类型
 * registerHandler使用的以“R_”开头
 * callHandler使用的以“C_”开头
 * @author liu_lin_sp@126.com
 * @date 2018/4/17
 */
'use strict'

export default {
  R_TEST: 'testJavascriptHandler',
  R_SHOW_RIGHR: 'titleShowRightName', // 获取title右侧的函数
  C_TEST: 'testObjcCallback',
  C_GET_TOKEN: 'getLoginToken', // 获取token
  C_GET_VERSION: 'getAppApiVersion', // 获取应用版本
  C_GET_FROM: 'getRequestFrom', // 获取请求来源，包含：Android、IOS、PC、MC、AndroidWEB、IOSWEB
  C_RELOGIN: 'tokenTimeOut' // 重新登录
}
