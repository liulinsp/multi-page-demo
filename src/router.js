/**
 * @file router
 * @author liu_lin_sp@126.com
 */

import Vue from 'vue'
import Router from 'vue-router'
import * as types from './store/mutation-types'
import NotFound from '@/pages/NotFound.vue'

Vue.use(Router)

// 所有页面使用的路由path，由build/loaders/router-loader收集插入
const allRoutes = []

/**
 * 根据allRoutes判断当前路由路径是否有效，包括动态路由
 *
 * @param {string} path 路由路径
 * @return {boolean} 是否是有效路由
 */
function validateRoute (path) {
  return allRoutes.includes(path) ||
        allRoutes.some(route => {
          // 生成路由路径对应的正则表达式 /detail/:id => /^\/detail\/[^\/]+\/?$/
          /* eslint-disable no-useless-escape */
          let routeRegex = new RegExp(`^${route.replace(/\/:[^\/]*/g, '/[^\/]+')}\/?$`)
          return routeRegex.test(path)
        })
}

export function createRouter ({routes = []}) {
  const router = new Router({
    // mode: 'history',
    base: '/',
    linkActiveClass: 'active',
    routes: [
      ...routes,
      {
        path: '*',
        component: NotFound,
        beforeEnter (to, from, next) {
          if (validateRoute(to.fullPath)) { // 跳转到有效路由
            window.location.href = to.fullPath
            return
          }
          next() // 继续展示404页面
        }
      }
    ]
  })

  return router
}
