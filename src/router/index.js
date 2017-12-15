import Vue from 'vue'
import Router from 'vue-router'
import { _hashExactAddress, _hasAdminInfo, _hasSellerInfo } from 'common/javascript/cache'

// 用户页面
const index = () => import('pages/index')
const join = () => import('pages/user/join')
const home = () => import('pages/user/home')
const order = () => import('pages/user/order')
const userProfile = () => import('pages/user/profile')
const place = () => import('pages/user/place')
const register = () => import('pages/user/register')
const login = () => import('pages/login')
const shop = () => import('pages/user/shop')
const applyShop = () => import('pages/user/applyShop')
const checkout = () => import('pages/user/checkout')
const shopCartSuccess = () => import('pages/user/shopCartSuccess')
const shopCartError = () => import('pages/user/shopCartError')
const shopCartPaying = () => import('pages/user/shopCartPaying')
const userNo = () => import('pages/user/pageNoFind')

// 商家页面
const seller = () => import('pages/seller/seller')
const sellerHome = () => import('pages/seller/home')
const sellerInfo = () => import('pages/seller/info')
const sellerMenu = () => import('pages/seller/menu')
const sellerNew = () => import('pages/seller/new')
const sellerRate = () => import('pages/seller/rate')
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
const classification = () => import('pages/admin/classification')
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
      redirect: '/place',
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
          path: '/shopCart/checkout',
          component: checkout
        },
        {
          path: '/shopCart/success',
          component: shopCartSuccess
        },
        {
          path: '/shopCart/paying',
          component: shopCartPaying
        },
        {
          path: '/shopCart/error',
          component: shopCartError
        },
        {
          path: '/login',
          name: 'login',
          component: login
        },
        {
          path: '/profile',
          name: 'userProfile',
          component: userProfile
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
      redirect: '/admin/home',
      children: [
        {
          path: 'home',
          component: adminHome
        },
        {
          path: 'audit',
          component: audit,
          beforeEnter: (to, from, next) => {
            // 判断是否有登录
            if (_hasAdminInfo()) {
              next()
            } else {
              next('/admin/home')
            }
          }
        },
        {
          path: 'shops',
          component: adminShops,
          beforeEnter: (to, from, next) => {
            // 判断是否有登录
            if (_hasAdminInfo()) {
              next()
            } else {
              next('/admin/home')
            }
          }
        },
        {
          path: 'statistics',
          component: statistics,
          beforeEnter: (to, from, next) => {
            // 判断是否有登录
            if (_hasAdminInfo()) {
              next()
            } else {
              next('/admin/home')
            }
          }
        },
        {
          path: 'user',
          component: adminUser,
          beforeEnter: (to, from, next) => {
            // 判断是否有登录
            if (_hasAdminInfo()) {
              next()
            } else {
              next('/admin/home')
            }
          }
        },
        {
          path: 'classification',
          component: classification,
          beforeEnter: (to, from, next) => {
            // 判断是否有登录
            if (_hasAdminInfo()) {
              next()
            } else {
              next('/admin/home')
            }
          }
        },
        // {
        //   path: 'goodsClassification',
        //   component: goodsClassification,
        //   beforeEnter: (to, from, next) => {
        //     // 判断是否有登录
        //     if (_hasAdminInfo()) {
        //       next()
        //     } else {
        //       next('/admin/home')
        //     }
        //   }
        // },
        // {
        //   path: 'shopsClassification',
        //   component: shopsClassification,
        //   beforeEnter: (to, from, next) => {
        //     // 判断是否有登录
        //     if (_hasAdminInfo()) {
        //       next()
        //     } else {
        //       next('/admin/home')
        //     }
        //   }
        // },
        {
          path: 'administrator',
          component: administrator,
          beforeEnter: (to, from, next) => {
            // 判断是否有登录
            if (_hasAdminInfo()) {
              next()
            } else {
              next('/admin/home')
            }
          }
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
      redirect: '/seller/order',
      beforeEnter: (to, from, next) => {
        if (_hasSellerInfo()) {
          next()
        } else {
          next('/login')
        }
      },
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
          path: 'rate',
          component: sellerRate
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
