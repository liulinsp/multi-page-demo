/**
 * @file router
 * @author liu_lin_sp@126.com
 */
import Banners from '@/pages/banners/Banners.vue'

export default {
  routes: [
    {
      path: '/',
      redirect: '/banners'
    },
    {
      path: '/banners',
      name: 'banners',
      component: Banners
    }
  ]
}
