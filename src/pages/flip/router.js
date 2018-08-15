/**
 * @file router
 * @author liu_lin_sp@126.com
 */
import Flip from '@/pages/flip/Flip.vue'

export default {
  routes: [
    {
      path: '/',
      redirect: '/flip'
    },
    {
      path: '/flip',
      name: 'flip',
      component: Flip
    }
  ]
}
