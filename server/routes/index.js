const User = require('../app/controllers/user')
const Seller = require('../app/controllers/seller')
const Admin = require('../app/controllers/admin')

module.exports = function (router, upload) {
  // router.use(async (ctx) => {
  //   ctx.cookies.set(
  //     'cid',
  //     'hello world',
  //     {
  //       maxAge: 10 * 60 * 1000,
  //       expires: new Date('2017-11-29'),
  //       httpOnly: false
  //     }
  //   )
  //   if (ctx.session.__sss) {
  //     console.log(`有值：${ctx.session.__sss}`)
  //     ctx.body = `有值：${ctx.session.__sss}`
  //   } else {
  //     ctx.session.__sss = `123`
  //     ctx.body = `hello`
  //   }
  // })
  router.post('/api/login', User.login)
  router.post('/api/code', User.sendCode)
  router.post('/api/regist', User.register)
  router.post('/api/reset', User.needSignIn, User.reset)
  router.post('/api/info/check', User.needSignIn, User.getUserInfo)
  router.post('/api/info/modify', User.needSignIn, User.modifyInfo)
  router.post('/api/info/apply', User.needSignIn, User.applyShop)
  router.post('/api/info/want2OpenShop', User.needSignIn, User.getApplyInfo)
  router.post('/api/info/logout', User.logOut)
  router.post('/api/order/new', User.needSignIn, User.newOrder)
  router.post('/api/order/pay', User.needSignIn, User.payOrder)
  router.post('/api/order/handleIsPay', User.handleIsPay)
  router.post('/api/order/find', User.needSignIn, User.getUserOrder)
  router.post('/api/order/delete', User.needSignIn, User.deleteOrder)
  router.post('/api/order/getPhone', User.getShopPhone)
  router.post('/api/order/finish', User.needSignIn, User.finishOrder)
  router.get('/api/shop/findByRange', User.getShopList)
  router.get('/api/shop/findById', User.getInfoByShopId)
  router.get('/api/shop/dish', User.getCommentByDishId)
  router.post('/api/comment/user', User.needSignIn, User.rateOrder)
  router.post('/api/types', User.getShopType)

  router.get('/api/shop/shopMsg', Seller.getShopInfo)
  router.get('/api/shopOrder', Seller.getShopOrder)
  router.get('/api/shop/getAllDish', Seller.getAllDish)
  router.get('/api/comment/dish', Seller.getRateList)
  router.get('/api/shopOrder/getNewOrder', Seller.isNewOrder)
  router.post('/api/shopOrder/handle', Seller.handleOrder)
  router.post('/api/shop/modifDish', Seller.needSignIn, Seller.modifyDish)
  router.post('/api/shop/delDish', Seller.needSignIn, Seller.delDish)
  router.post('/api/shop/addDish', Seller.needSignIn, Seller.addDish)
  router.post('/api/shop/updateShop', Seller.needSignIn, Seller.modifyShopInfo)

  router.post('/api/admin/login', Admin.login)
  router.get('/api/admin/all', Admin.getAdminList)
  router.post('/api/admin/addition', Admin.needSignIn, Admin.addition)
  router.post('/api/admin/deletion', Admin.needSignIn, Admin.deletion)
  router.post('/api/admin/configuration', Admin.needSignIn, Admin.configuration)
  router.post('/api/shop/management/freeze', Admin.needSignIn, Admin.freezeShop)
  router.get('/api/shop/management/all', Admin.getShopsList)
  router.get('/api/shop/management/:shopId', Admin.getShopInfoById)
  router.get('/api/shopApply/management/all', Admin.getApplyList)
  router.get('/api/shopApply/management/:shopApplyId', Admin.getApplyInfoById)
  router.get('/api/shopType/management/all', Admin.getShopTypeList)
  router.get('/api/foodType/management/all', Admin.getFoodTypeList)
  router.post('/api/shopApply/management/examination', Admin.needSignIn, Admin.auditApply)
  router.post('/api/shopType/management/deletion', Admin.needSignIn, Admin.delShopType)
  router.post('/api/foodType/management/deletion', Admin.needSignIn, Admin.delFoodType)
  router.post('/api/foodType/management/addition', Admin.needSignIn, Admin.addFoodType)
  router.post('/api/shopType/management/addition', Admin.needSignIn, Admin.addShopType)
  router.get('/api/user/management/all', Admin.getUserList)

  router.post('/api/upload', upload.single('image'), async (ctx, next) => {
    // const { originalname, path, mimetype, filename } = ctx.req.file
    ctx.body = {
      code: 1,
      data: {
        imageUrl: ctx.req.file.path.replace('public', '')
      }
    }
  })
  router.post('/api/image/shop', upload.single('image'), async (ctx, next) => {
    // const { originalname, path, mimetype, filename } = ctx.req.file
    ctx.body = {
      code: 1,
      data: {
        imageUrl: ctx.req.file.path.replace('public', '')
      }
    }
  })
}

// async function getRequest (options) {
//   return new Promise((resolve, reject) => {
//     request(options, (err, response, body) => {
//       if (err) console.log(err)
//       resolve(body)
//     })
//   })
// }
// router.get('/elemeSuggestions', async (ctx, next) => {
//   ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080')
//   ctx.set('Access-Control-Allow-Credentials', 'true')
//   const url = ctx.request.query.url
//   const geohash = ctx.request.query.geohash
//   const keyword = ctx.request.query.keyword
//   const options = {
//     method: 'GET',
//     url: url,
//     qs:
//     {
//       'extras[]': 'count',
//       geohash,
//       keyword,
//       limit: '20',
//       type: 'nearby'
//     }
//   }
//   const body = await getRequest(options)
//   ctx.body = body
// })

// // 这是根据经纬度，调用饿了么食物接口
// // https://www.ele.me/restapi/shopping/restaurants?extras[]=activities&geohash=w7y2mfr4g2x&latitude=21.15053&limit=24&longitude=110.30151&offset=0&terminal=web
// router.get('/', async (ctx, next) => {
//   await ctx.render('index', {
//     title: 'Hello Koa 2!'
//   })
// })
// router.get('/string', async (ctx, next) => {
//   ctx.body = 'koa2 string'
// })
// router.get('/json', async (ctx, next) => {
//   ctx.body = {
//     title: 'koa2 json'
//   }
// })
// module.exports = router
