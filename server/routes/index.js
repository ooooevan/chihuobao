const User = require('../app/controllers/user')

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
  router.post('/api/sendCode', User.sendCode)
  router.post('/api/register', User.register)
  router.post('/api/logOut', User.logOut)
  router.get('/api/shop/findByRange', User.getShopList)
  router.get('/api/shop/findById', User.getInfoByShopId)
  router.get('/api/shop/dish', User.getCommentByDishId)
  router.post('/api/order/find', User.findOrder)

  router.post('/upload', upload.single('file'), async (ctx, next) => {
    // const { originalname, path, mimetype, filename } = ctx.req.file
    ctx.body = ctx.req.file
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
