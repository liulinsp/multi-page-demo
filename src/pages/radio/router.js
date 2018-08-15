/**
 * @file router
 * @author liu_lin_sp@126.com
 */
import Radio from '@/pages/radio/Radio.vue'

export default {
  routes: [
    {
      path: '/',
      redirect: '/radio'
    },
    {
      path: '/radio',
      name: 'radio',
      component: Radio
    }
  ]
}
