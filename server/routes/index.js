const request = require('request')
const router = require('koa-router')()

async function getRequest (options) {
  return new Promise((resolve, reject) => {
    request(options, (err, response, body) => {
      if (err) console.log(err)
      resolve(body)
    })
  })
}

router.get('/elemeSuggestions', async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080')
  ctx.set('Access-Control-Allow-Credentials', 'true')
  const url = ctx.request.query.url
  const geohash = ctx.request.query.geohash
  const keyword = ctx.request.query.keyword
  const options = {
    method: 'GET',
    url: url,
    qs:
    {
      'extras[]': 'count',
      geohash,
      keyword,
      limit: '20',
      type: 'nearby'
    }
  }
  const body = await getRequest(options)
  ctx.body = body
})
// 这是根据经纬度，调用饿了么食物接口
// https://www.ele.me/restapi/shopping/restaurants?extras[]=activities&geohash=w7y2mfr4g2x&latitude=21.15053&limit=24&longitude=110.30151&offset=0&terminal=web
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
