const Koa = require('koa')
const app = new Koa()
const fs = require('fs')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-session2')
const router = require('koa-router')()
const compress = require('koa-compress')
const path = require('path')
const staticCache = require('koa-static-cache')
const multer = require('koa-multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/')
  },
  filename: function (req, file, cb) {
    const fileFormat = (file.originalname).split(`.`)
    cb(null, `${Date.now()}.${fileFormat[fileFormat.length - 1]}`)
  }
})
const upload = multer({storage: storage})
const options = {  // 设置连接池，自动连接，否则可能会出现：topology was destroyed
  useMongoClient: true,
  // auto_reconnect: true,
  poolSize: 10,
  reconnectTries: 30,
  reconnectInterval: 3000
}
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/vue', options)
mongoose.connection.on('error', console.log.bind(console, '连接mongoDb数据库错误'))
mongoose.connection.on('open', console.log.bind(console, '连接数据库成功'))

// 加载models
require('./app/models/admin')
require('./app/models/dish_comment')
require('./app/models/dish_type')
require('./app/models/user')
require('./app/models/shop_apply')
require('./app/models/shop_order')
require('./app/models/shop_type')
require('./app/models/shop')
require('./app/models/user_order')
require('./app/models/menu')

// error handler
onerror(app)
// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(`${__dirname}/public`))
app.use(views(`${__dirname}/views`, {
  extension: 'pug'
}))

// 压缩
app.use(compress({
  filter: function (contentType) {
    return /text/i.test(contentType)
  },
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH
}))
// 静态资源缓存
const cacheTime = 365 * 24 * 60 * 60
app.use(staticCache(path.join(__dirname, 'public'), {
  maxAge: cacheTime
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(session({
  key: 'sessionid---'
}))
// app.use(async (ctx, next) => {
  // ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080')
  // ctx.set('Access-Control-Allow-Credentials', 'true')
  // ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  // await next()
// })
// 处理路由
require('./routes/index')(router, upload)

// let User = mongoose.model('User')
// // User.create({user_name: 'eee', user_pwd: 'eee'})
// new User({user_name: 'aaa3', user_pwd: 'aaa', phone_num: 1321, is_merchant: 123}).save(function (err) {
//   if (err) throw new Error(err)
//   console.log(`添加到数据库成功`)
// })
// const Shop = mongoose.model('Shop')
// Shop.create({shop_name: '123'})
// console.log('创建一个shop，123')
app
  .use(router.routes())
  .use(router.allowedMethods())

app.use(async (ctx) => {
  // ctx.body = await fs.readFile(`${__dirname}/public/index.html`)
  var htmlFile = await new Promise(function (resolve, reject) {
    fs.readFile(`${__dirname}/public/index.html`, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
  ctx.type = 'html'
  ctx.body = htmlFile
})
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
