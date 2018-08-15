/**
 * @file router
 * @author liu_lin_sp@126.com
 */
import Switch from '@/pages/switch/Switch.vue'

export default {
  routes: [
    {
      path: '/',
      redirect: '/switch'
    },
    {
      path: '/switch',
      name: 'switch',
      component: Switch
    }
  ]
}
