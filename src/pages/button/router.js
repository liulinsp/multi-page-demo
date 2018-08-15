/**
 * @file router
 * @author liu_lin_sp@126.com
 */
import Button from '@/pages/button/Button.vue'

export default {
  routes: [
    {
      path: '/',
      redirect: '/button'
    },
    {
      path: '/button',
      name: 'button',
      component: Button
    }
  ]
}
