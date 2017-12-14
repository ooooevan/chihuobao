const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const Menu = new mongoose.Schema({
  shop_id: {
    type: ObjectId,
    ref: 'Shop'
  },
  dish_name: String,
  dish_introduction: String,
  dish_price: Number,
  dish_pics: String,
  level: Number,    // 商品平均评价，实际存的是累加评价，请求数据时会计算
  comment_sales: {  // 评价了的数量，用于计算平均分数
    type: Number,
    default: 0
  },
  dish_type: {
    type: ObjectId,
    ref: 'DishType'
  },
  create_time: {
    type: Date,
    default: Date.now()
  },
  monthly_sales: {   // 这是累加量，不按月，一直加
    type: Number,
    default: 0
  }
})
module.exports = mongoose.model('MenuModel', Menu)
