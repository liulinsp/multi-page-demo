/**
 * @file router
 * @author liu_lin_sp@126.com
 */
import Popup from '@/pages/popup/Popup.vue'

export default {
  routes: [
    {
      path: '/',
      redirect: '/popup'
    },
    {
      path: '/popup',
      name: 'popup',
      component: Popup
    }
  ]
}
