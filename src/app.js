/**
 * @file app
 * @author liu_lin_sp@126.com
 */
require('./assets/style/reset.css')
require('./assets/style/main.css')

import Vue from 'vue'
// import Vuetify from 'vuetify'
import App from './App.vue'
import {createRouter} from './router.js'
import store from './store'
import Icon from '@/components/Icon.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import FastClick from 'fastclick'

import eventBusPlugin from './plugins/eventBusPlugin.js'
// import JsBridgePlugin from './plugins/jsbridge-plugin/index.js'
import ToastPlugin from './plugins/toastPlugin.js'
import ApiPlugin from './plugins/apiPlugin.js'

// 全局的进度条，在组件中可通过 $loading 访问
let loading = null
if (window.__PRERENDER_INJECTED) { // 预渲染
  loading = {start () {}, finish () {} }
} else {
  loading = Vue.prototype.$loading = new Vue(ProgressBar).$mount()
  document.body.appendChild(loading.$el)
}

// 处理移动端click事件300毫秒延迟
FastClick.attach(document.body)

// 注册全局icon组件
Vue.component('icon', Icon)

// 注册全局事件总线
Vue.use(eventBusPlugin)
// 注册JSBridge插件 【注：依赖全局事件总线】
// Vue.use(JsBridgePlugin)
// toast提示信息插件
Vue.use(ToastPlugin)
// 后台接口插件
Vue.use(ApiPlugin)

Vue.config.productionTip = false

Vue.mixin({
  // 当复用的路由组件参数发生变化时，例如/detail/1 => /detail/2
  beforeRouteUpdate(to, from, next) {

    // asyncData方法中包含异步数据请求
    let asyncData = this.$options.asyncData;

    if (asyncData) {
      loading.start();
      asyncData.call(this, {
        store: this.$store,
        route: to
      }).then(() => {
        loading.finish();
        next();
      }).catch(next);
    }
    else {
      next();
    }
  }
})

/* eslint-disable no-new */
export function createApp (routerParams) {
  // console.log(routerParams)
  let router = createRouter(routerParams)

  // 此时异步组件已经加载完成
  router.beforeResolve((to, from, next) => {
    let matched = router.getMatchedComponents(to)
    let prevMatched = router.getMatchedComponents(from)

    // [a, b]
    // [a, b, c, d]
    // => [c, d]
    let diffed = false
    let activated = matched.filter((c, i) => {
      let ret = diffed || (diffed = (prevMatched[i] !== c))
      return ret
    })

    if (!activated.length) {
      return next()
    }

    loading.start()
    Promise.all(activated.map(c => {
      /**
       * 两种情况下执行asyncData:
       * 1. 非keep-alive组件每次都需要执行
       * 2. keep-alive组件首次执行，执行后添加标志
       */
      if (c.asyncData && (!c.asyncDataFetched || to.meta.notKeepAlive)) {
        /* eslint-disable no-useless-call */
        return c.asyncData.call(c, {
          store,
          route: to
        }).then(() => {
          c.asyncDataFetched = true
        })
      }
    })).then(() => {
      loading.finish()
      next()
    }).catch(next)
  })

  /*router.beforeEach((to, from, next) => {
    console.log('##### from=', from, ', to=', to)
    next()
  })*/

  const app = new Vue({
    router,
    store,
    ...App
  })
  return {app, router, store}
}
