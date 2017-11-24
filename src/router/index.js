import Vue from 'vue'
import Router from 'vue-router'
import { _hashExactAddress } from 'common/javascript/cache'

// 用户页面
const index = () => import('components/user/index')
const join = () => import('components/user/join')
const home = () => import('components/user/home')
const order = () => import('components/user/order')
const place = () => import('components/user/place')
const register = () => import('components/user/register')
const shop = () => import('components/user/shop')
const userNo = () => import('components/user/pageNoFind')

// 商家页面
const seller = () => import('components/seller/seller')
const sellerHome = () => import('components/seller/home')
const sellerInfo = () => import('components/seller/info')
const sellerMenu = () => import('components/seller/menu')
const sellerNew = () => import('components/seller/new')
const sellerOrder = () => import('components/seller/order')
const revenue = () => import('components/seller/revenue')
const sellerStatistics = () => import('components/seller/statistics')
const sellerNo = () => import('components/seller/pageNoFind')

// 管理员页面
const admin = () => import('components/admin/admin')
const adminHome = () => import('components/admin/home')
const audit = () => import('components/admin/audit')
const adminShops = () => import('components/admin/shops')
const statistics = () => import('components/admin/statistics')
const adminUser = () => import('components/admin/user')
const goodsClassification = () => import('components/admin/goodsClassification')
const shopsClassification = () => import('components/admin/shopsClassification')
const adminNo = () => import('components/admin/pageNoFind')
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
          component: place,
          beforeEnter: (to, from, next) => {
            // 判断是否有地址，没有跳转到选择地址
            if (_hashExactAddress()) {
              next()
            } else {
              next('/home')
            }
          }
        },
        {
          path: 'shop',
          name: 'shop',
          component: shop
        },
        {
          path: '/register',
          name: 'register',
          component: register
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
