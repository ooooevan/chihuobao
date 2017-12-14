const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const Shop = new mongoose.Schema({
  user_id: {
    type: ObjectId,
    ref: 'User'
  },
  shop_name: String,
  shop_logo: String,
  shop_type: String,
  shop_abstract: String,
  shop_location: String,
  shop_announcement: String,
  shop_status: {
    type: Number,
    default: 0
  },
  shop_phone: Number,
  shop_work_time: String,
  shop_delivery_cost: Number,
  shop_delivery_time: Number,
  shop_start_delivery: String,
  shop_stores_images: String,
  shop_detail_images: String,
  shop_longitude: Number,
  shop_latitude: Number,
  level: {            // 平均评分，实际保存的是累加评分
    type: Number,
    default: 0
  },
  total_time: Number,
  monthly_sales: {
    type: Number,
    default: 0
  },
  comment_sales: {      // 被评价的菜的数量，用于计算商铺平均分
    type: Number,
    default: 0
  },
  create_time: {
    type: Date,
    default: new Date()
  }
})

module.exports = mongoose.model('Shop', Shop)
