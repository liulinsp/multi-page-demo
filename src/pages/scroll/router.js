/**
 * @file scroll router
 * @author liu_lin_sp
 */
import Scroll from '@/pages/scroll/index.vue'
import ScrollNormal from '@/pages/scroll/ScrollNormal.vue'
import ScrollListView from '@/pages/scroll/ScrollListView.vue'
import ScrollHorizontal from '@/pages/scroll/ScrollHorizontal.vue'

export default {
  routes: [
    {
      path: '/',
      redirect: '/scroll/normal'
    },
    {
      path: '/scroll',
      name: 'scroll',
      component: Scroll,
      redirect: '/scroll/normal',
      children: [
        {
          path: 'normal',
          name: 'scrollNormal',
          component: ScrollNormal
        },
        {
          path: 'list',
          name: 'scrollList',
          component: ScrollListView
        }, {
          path: 'horizontal',
          name: 'scrollHorizontal',
          component: ScrollHorizontal
        }
      ]
    }
  ]
}
