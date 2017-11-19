import Vue from 'vue'
import Router from 'vue-router'
import index from 'components/user/index'
import join from 'components/user/join'
import home from 'components/user/home'
import order from 'components/user/order'
import place from 'components/user/place'
import userNo from 'components/user/pageNoFind'

import seller from 'components/seller/seller'
import sellerHome from 'components/seller/home'
import sellerInfo from 'components/seller/info'
import sellerMenu from 'components/seller/menu'
import sellerNew from 'components/seller/new'
import sellerOrder from 'components/seller/order'
import revenue from 'components/seller/revenue'
import sellerStatistics from 'components/seller/statistics'
import sellerNo from 'components/seller/pageNoFind'

import admin from 'components/admin/admin'
import adminHome from 'components/admin/home'
import audit from 'components/admin/audit'
import adminShops from 'components/admin/shops'
import statistics from 'components/admin/statistics'
import adminUser from 'components/admin/user'
import goodsClassification from 'components/admin/goodsClassification'
import shopsClassification from 'components/admin/shopsClassification'
import adminNo from 'components/admin/pageNoFind'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      redirect: '/home',
      children: [
        {
          path: 'home',
          name: 'home',
          component: home,
          beforeEnter: (to, from, next) => {
            // 如果存储了地理位置，就到place
            // next('/place')
            next()
          }
        },
        {
          path: '/order',
          name: 'order',
          component: order
        },
        {
          path: '/join',
          name: 'join',
          component: join
        },
        {
          path: '/place',
          name: 'place',
          component: place
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin,
      redirect: '/admin/home',
      children: [
        {
          path: 'home',
          component: adminHome
        },
        {
          path: 'audit',
          component: audit
        },
        {
          path: 'shops',
          component: adminShops
        },
        {
          path: 'statistics',
          component: statistics
        },
        {
          path: 'user',
          component: adminUser
        },
        {
          path: 'goodsClassification',
          component: goodsClassification
        },
        {
          path: 'shopsClassification',
          component: shopsClassification
        },
        {
          path: '*',
          component: adminNo
        }
      ]
    },
    {
      path: '/seller',
      name: 'seller',
      component: seller,
      redirect: '/seller/home',
      children: [
        {
          path: 'home',
          component: sellerHome
        },
        {
          path: 'info',
          component: sellerInfo
        },
        {
          path: 'menu',
          component: sellerMenu
        },
        {
          path: 'new',
          component: sellerNew
        },
        {
          path: 'order',
          component: sellerOrder
        },
        {
          path: 'revenue',
          component: revenue
        },
        {
          path: 'statistics',
          component: sellerStatistics
        },
        {
          path: '*',
          component: sellerNo
        }
      ]
    },
    {
      path: '*',
      component: userNo
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   next()
// })

export default router
