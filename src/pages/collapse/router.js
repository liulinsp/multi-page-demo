/**
 * @file router
 * @author liu_lin_sp@126.com
 */
import Collapse from '@/pages/collapse/Collapse.vue'

export default {
  routes: [
    {
      path: '/',
      redirect: '/collapse'
    },
    {
      path: '/collapse',
      name: 'collapse',
      component: Collapse
    }
  ]
}
