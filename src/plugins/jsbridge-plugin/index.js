/**
 * jsbridge插件（APP混合开发）
 * @author liu_lin_sp@126.com
 * @date 2018/4/17
 */
'use strict'

import device from './device'
import cmd from './cmd-type'
import defaultBridge from 'default-bridge'
// console.log('defaultBridge:', defaultBridge)

export default {
  install (Vue, option) {
    // 初始化jsBridge
    Vue.prototype.$jsBridge = defaultBridge
    // 所有原生和js通信的命令
    Vue.prototype.$jsBridgeCmd = cmd
    // if (device.webView) {
    if (device.android) {
      // document.body.innerHTML = document.body.innerHTML + '<div>' + navigator.userAgent + '</div>'
      androidSetWebViewJavascriptBridge(function (bridge) {
        Vue.prototype.$jsBridge = bridge
        initBridge(bridge)
        Vue.prototype.$eventBus.$emit('jsbridgeReady')
      })
    } else if (device.ios) {
      iosSetupWebViewJavascriptBridge(function (bridge) {
        Vue.prototype.$jsBridge = bridge
        // initBridge(bridge)
        Vue.prototype.$eventBus.$emit('jsbridgeReady')
      })
    } else {
      Vue.prototype.$eventBus.$emit('jsbridgeReady')
    }
    // }
  }
}

// 安卓
function androidSetWebViewJavascriptBridge (callback) {
  if (window.WebViewJavascriptBridge) {
    console.log('有WebViewJavascriptBridge对象')
    return callback(window.WebViewJavascriptBridge)
  } else {
    console.log('没有WebViewJavascriptBridge对象,等待WebViewJavascriptBridgeReady事件回调')
    document.addEventListener(
      'WebViewJavascriptBridgeReady'
      , function () {
        console.log('WebViewJavascriptBridgeReady事件回调了')
        callback(window.WebViewJavascriptBridge)
      },
      false
    )
  }
}

// ios
function iosSetupWebViewJavascriptBridge (callback) {
  if (window.WebViewJavascriptBridge) { return callback(window.WebViewJavascriptBridge) }
  if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback) }
  window.WVJBCallbacks = [callback]
  var WVJBIframe = document.createElement('iframe')
  WVJBIframe.style.display = 'none'
  WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__'
  document.documentElement.appendChild(WVJBIframe)
  setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
}

// TODO jsbridge 初始化，APP联调用，待根据业务需求调整
function initBridge (bridge) {
  /* bridge.init(function (message, responseCallback) {
    console.log('jsBridge.init got a message', message)
    var data = { 'Javascript Responds': 'Wee!' }
    console.log('jsBridge.init responding with', data)
    responseCallback(data)
  }) */
  bridge.init(function (message, responseCallback) {
    // alert('接收到APP发送的消息：' + message)
    var data = { 'actionOn': '0' }
    responseCallback(data)
    window.location.href = message
  })
}
