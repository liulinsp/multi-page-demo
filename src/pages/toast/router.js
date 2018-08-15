/**
 * @file router
 * @author liu_lin_sp@126.com
 */
import Toast from '@/pages/toast/Toast.vue'

export default {
  routes: [
    {
      path: '/',
      redirect: '/toast'
    },
    {
      path: '/toast',
      name: 'toast',
      component: Toast
    }
  ]
}
