/**
 * @file home router
 * @author liu_lin_sp@126.com
 */
import Home from '@/pages/home/Home.vue'

export default {
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    }
  ]
}
