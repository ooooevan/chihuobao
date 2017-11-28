const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-session2')
const jwtKoa = require('koa-jwt')
const jwt = require('jsonwebtoken')
const phantom = require('phantom')
// var session = require('koa-generic-session')
// var MongooseStore = require('koa-session-mongoose')
var mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/vue', {useMongoClient: true})
let db = mongoose.connection
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(`${__dirname}/public`))
app.use(jwtKoa({ secret: 'shared-secret' }).unless({ path: [/^\/public/, /^\/register/, /^\/login/] }))
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

// app.use(async ctx => {
//   const token = jwt.sign({ name: 'evan' }, 'shhhhh', {expiresIn: 60 * 60}) // 按秒计算
//   var decoded = jwt.verify(token, 'wsd')
//   jwt.verify(`${token}1`, 'wsd', function (err, decoded) {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log(decoded.aa)
//     }
//   })
//   ctx.body = token
// })

// require('./routes/index')(app)
// require('./app/models/user')
// require('./app/coltrollers/user')

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

db.on('error', console.log.bind(console, '连接错误'))
db.on('open', console.log.bind(console, '连接成功'))
module.exports = app
