/**
 * @file router
 * @author liu_lin_sp@126.com
 */
import Checkbox from '@/pages/checkbox/Checkbox.vue'

export default {
  routes: [
    {
      path: '/',
      redirect: '/checkbox'
    },
    {
      path: '/checkbox',
      name: 'checkbox',
      component: Checkbox
    }
  ]
}
