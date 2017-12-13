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
const moment = require('moment')
moment().format('YYYY-MM-DD HH:mm:ss')

const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/vue', {useMongoClient: true})
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
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080')
  // ctx.set('Access-Control-Allow-Origin', 'http://localhost:8081')
  ctx.set('Access-Control-Allow-Credentials', 'true')
  ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  await next()
})
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
