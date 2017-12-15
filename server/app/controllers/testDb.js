const moment = require('moment')
moment().format()

const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/vue', {useMongoClient: true})
mongoose.connection.on('error', console.log.bind(console, '连接mongoDb数据库错误'))
mongoose.connection.on('open', console.log.bind(console, '连接数据库成功'))

// 加载models
require('../models/admin')
require('../models/dish_comment')
require('../models/dish_type')
require('../models/user')
require('../models/shop_apply')
require('../models/shop_order')
require('../models/shop_type')
require('../models/shop')
require('../models/user_order')
require('../models/menu')

// 添加商家分类数据
// const ShopType = mongoose.model('ShopType')
// ShopType.create({type: '快餐', code: 1})
// ShopType.create({type: '料理', code: 2})
// ShopType.create({type: '小吃', code: 3})
// ShopType.create({type: '早餐', code: 4})
// ShopType.create({type: '午餐', code: 5})
// ShopType.create({type: '宵夜', code: 6})
// ShopType.create({type: '水果', code: 7})
// ShopType.find({}).exec((err, types) => {
//   if (err) console.log(err)
//   console.log(types)
// })
// 添加食物分类数据
// const DishType = mongoose.model('DishType')
// DishType.create({type: '辛辣', code: 1})
// DishType.create({type: '麻辣', code: 2})
// DishType.create({type: '点心', code: 3})
// DishType.create({type: '水果', code: 4})
// DishType.create({type: '下午茶', code: 5})
// DishType.create({type: '饮料', code: 6})
// DishType.create({type: '清淡', code: 7})
// DishType.create({type: '面食', code: 8})
// DishType.create({type: '烧烤', code: 9})
// DishType.find({}).exec((err, types) => {
//   if (err) console.log(err)
//   console.log(types)
// })

// 添加用户
const User = mongoose.model('User')
// User.create({user_name: 'user', user_pwd: '123456', phone_num: '12345678910', avator: 'https://fuss10.elemecdn.com/a/07/b14a3c916e62d27163ced7a1c9c7fpng.png?imageMogr2/thumbnail/70x70', gender: 1, acceptAddress: '', introduction: 'hhh'})
// User.create({user_name: 'eee', user_pwd: '123456', phone_num: '11111122331', avator: 'https://fuss10.elemecdn.com/a/07/b14a3c916e62d27163ced7a1c9c7fpng.png?imageMogr2/thumbnail/70x70', gender: 1, acceptAddress: '', introduction: 'hhh'})
// User.create({user_name: 'test1', user_pwd: '123456', phone_num: '11111122332', avator: 'https://fuss10.elemecdn.com/a/07/b14a3c916e62d27163ced7a1c9c7fpng.png?imageMogr2/thumbnail/70x70', gender: 1, acceptAddress: '', introduction: 'hhh'})
// User.create({user_name: 'test2', user_pwd: '123456', phone_num: '11111122333', avator: 'https://fuss10.elemecdn.com/a/07/b14a3c916e62d27163ced7a1c9c7fpng.png?imageMogr2/thumbnail/70x70', gender: 1, acceptAddress: '', introduction: 'hhh'})
// User.create({user_name: 'test3', user_pwd: '123456', phone_num: '11111122334', avator: 'https://fuss10.elemecdn.com/a/07/b14a3c916e62d27163ced7a1c9c7fpng.png?imageMogr2/thumbnail/70x70', gender: 0, acceptAddress: '', introduction: 'hhh'})
// User.find({}).exec((err, users) => {
//   if (err) console.log(err)
//   console.log(users)
// })

// 添加商铺申请
const ShopApply = mongoose.model('ShopApply')
// ShopApply.create({
//   user_id: '5a2bcb6395f94c4708b6d154',
//   identification_num: '442546199901019541',
//   identification_pic: 'https://afp.alicdn.com/afp-creative/creative/u124884735/b84c510178cda0088b8b315b536c5773.png',
//   shop_name: '肯德基',
//   shop_logo: 'https://fuss10.elemecdn.com/4/ed/0c168f4f14d4107548a1d3da9b2a0jpeg.jpeg?imageMogr2/thumbnail/95x95/format/webp/quality/85',
//   shop_abstract: '这是肯德基',
//   shop_location: '北京朝阳区',
//   shop_auth_images: 'https://fuss10.elemecdn.com/8/b4/af28b7f1ec408a72f7043b75c0383jpeg.jpeg?imageMogr/format/webp/',
//   shop_type: 1,
//   shop_latitude: '21.150362',
//   shop_longitude: '110.301132'
// })
// ShopApply.create({
//   user_id: '5a2bcb6395f94c4708b6d155',
//   identification_num: '442541199901019321',
//   identification_pic: 'https://afp.alicdn.com/afp-creative/creative/u124884735/b84c510178cda0088b8b315b536c5773.png',
//   shop_name: '薡御贡茶海大店',
//   shop_logo: 'https://fuss10.elemecdn.com/0/a7/45a05b6331743cfd40f686912927cpng.png?imageMogr2/thumbnail/95x95/format/webp/quality/85',
//   shop_abstract: '这是薡御贡茶海大店',
//   shop_location: '广东海洋大学主校区正门口对面月岭村委会综合楼一楼13号',
//   shop_auth_images: 'https://fuss10.elemecdn.com/8/b4/af28b7f1ec408a72f7043b75c0383jpeg.jpeg?imageMogr/format/webp/',
//   shop_type: 1,
//   shop_latitude: '21.144709',
//   shop_longitude: '110.302246'
// })
// ShopApply.find({}).exec((err, shops) => {
//   if (err) console.log(err)
//   console.log(shops)
// })

// 添加商铺，用上面shopApply赋值
const Shop = mongoose.model('Shop')
// ShopApply.find({}).exec((err, shops) => {
//   if (err) console.log(err)
//   shops.forEach(shop => {
//     Shop.create({
//       user_id: shop.user_id,
//       shop_name: shop.shop_name,
//       shop_logo: shop.shop_logo,
//       shop_abstract: shop.shop_abstract,
//       shop_location: shop.shop_location,
//       shop_status: 1,
//       shop_stores_images: shop.shop_auth_images,
//       shop_longitude: shop.shop_longitude,
//       shop_latitude: shop.latitude
//     })
//   })
// })
// Shop.find({}).exec((err, shops) => {
//   if (err) console.log(err)
//   console.log(shops)
// })

// 往商铺添加菜单
// const Menu = mongoose.model('MenuModel')
// Shop.findOne({}).exec((err, shop) => {
//   Menu.create({
//     shop_id: shop._id,
//     dish_name: '熊猫奶盖茶',
//     dish_introduction: '茶底有珍珠、寒天冻，奶盖上面有奥利奥饼干碎，配料十分丰富！',
//     dish_price: 14,
//     dish_pics: 'https://fuss10.elemecdn.com/c/93/e65a59628dfc5144a63f7e2bf2163jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85'
//   })
//   Menu.create({
//     shop_id: shop._id,
//     dish_name: '布丁奶绿',
//     dish_introduction: '布丁奶绿布丁奶绿```',
//     dish_price: 10,
//     dish_pics: 'https://fuss10.elemecdn.com/3/fc/6d17ba6a9685d248206fbc8cd58fbjpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85'
//   })
//   Menu.create({
//     shop_id: shop._id,
//     dish_name: '熊猫果茶',
//     dish_introduction: '熊猫果茶熊猫果茶```',
//     dish_price: 14,
//     dish_pics: 'https://fuss10.elemecdn.com/3/ca/a84cb3f8cb2d6cd0cfb2d8726efa3jpeg.jpeg?imageMogr2/thumbnail/100x100/format/webp/quality/85'
//   })
//   // Menu.find({}).exec((err, menu) => {
//   //   if (err) console.log(err)
//   //   console.log(menu)
//   // })
// })

// 添加管理员，配置不同模块的权限
// const Admin = mongoose.model('Admin')
// Admin.create({admin_name: 'root', admin_pwd: 'root', merchant_mp: 1, shop_type_mp: 1, shop_mp: 1, food_type_mp: 1, is_super: 1})
// Admin.create({admin_name: 'admin', admin_pwd: '123456', merchant_mp: 1, shop_type_mp: 1, shop_mp: 1, food_type_mp: 1, is_super: 0})
// Admin.create({admin_name: 'admin2', admin_pwd: '123456', merchant_mp: 1, shop_type_mp: 1, shop_mp: 1, food_type_mp: 1, is_super: 0})
// const aaa = 'Admin'
// const property = 'admin_name'
// const reg = new RegExp(aaa, 'igm')
// Admin.find({[property]: reg}).exec((err, admins) => {
//   if (err) console.log(err)
//   console.log(admins)
// })

// 查询测试
// const User = mongoose.model('User')
// const property = 'phone_num'
// const keyword = '13432841079'
// User.find({[property]: keyword}).exec((err,user) => {
//   console.log(user)
// })
// const keyword = 'test'
// User.find({'user_name': keyword}).exec((err, user) => {
//   console.log(user)
// })

// console.log(new Date(moment(new Date())))

// 查看销量，看order的food_list长度
const ShopOrder = mongoose.model('ShopOrder')
// ShopOrder.find({shop_id: '5a2e6babd8760360f828cde9'}).exec((err, order) => {
//   console.log(JSON.parse(order[0].food_list))
// })

// 用populate联查
// ShopOrder.findOne({_id: '5a30f4627582053d4c122ecc'}).populate('user_id shop_id', 'user_name shop_name').exec((err, order) => {
//   console.log(order)
// })

// ShopApply.find({user_id: '5a2bcb6395f94c4708b6d155'}).exec((err, apply) => {
//   console.log(apply)
// })
// ShopOrder.update({_id: '5a321b8010e3372c1c021764'}, {$set: {is_comment: 1}}).exec()

// Shop.findOne({}).exec((err, shop) => {
//   console.log(shop.total_time)
//   console.log(shop)
// })
// process.on('unhandledRejection', error => {
//   // Prints "unhandledRejection woops!"
//   console.log('unhandledRejection', error.test)
// })

// // new Promise((_, reject) => reject({ test: 'woops!' }))
User.create({user_pwd: '123456', user_name: 'far4e3r233', phone_num: 13432841079})
