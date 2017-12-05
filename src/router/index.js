import Vue from 'vue'
import Router from 'vue-router'
import { _hashExactAddress } from 'common/javascript/cache'

// 用户页面
const index = () => import('pages/user/index')
const join = () => import('pages/user/join')
const home = () => import('pages/user/home')
const order = () => import('pages/user/order')
const place = () => import('pages/user/place')
const register = () => import('pages/user/register')
const login = () => import('pages/user/login')
const shop = () => import('pages/user/shop')
const applyShop = () => import('pages/user/applyShop')
const userNo = () => import('pages/user/pageNoFind')

// 商家页面
const seller = () => import('pages/seller/seller')
const sellerHome = () => import('pages/seller/home')
const sellerInfo = () => import('pages/seller/info')
const sellerMenu = () => import('pages/seller/menu')
const sellerNew = () => import('pages/seller/new')
const sellerOrder = () => import('pages/seller/order')
const revenue = () => import('pages/seller/revenue')
const sellerStatistics = () => import('pages/seller/statistics')
const sellerNo = () => import('pages/seller/pageNoFind')

// 管理员页面
const admin = () => import('pages/admin/admin')
const adminHome = () => import('pages/admin/home')
const audit = () => import('pages/admin/audit')
const adminShops = () => import('pages/admin/shops')
const statistics = () => import('pages/admin/statistics')
const adminUser = () => import('pages/admin/user')
const goodsClassification = () => import('pages/admin/goodsClassification')
const classification = () => import('pages/admin/classification')
const shopsClassification = () => import('pages/admin/shopsClassification')
const administrator = () => import('pages/admin/administrator')
const adminNo = () => import('pages/admin/pageNoFind')
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
          path: 'shop/:shopId',
          name: 'shop',
          component: shop
        },
        {
          path: '/register',
          name: 'register',
          component: register
        },
        {
          path: '/login',
          name: 'login',
          component: login
        },
        {
          path: '/applyShop',
          name: 'applyShop',
          component: applyShop
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin,
      redirect: '/admin/user',
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
          path: 'classification',
          component: classification
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
          path: 'administrator',
          component: administrator
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
