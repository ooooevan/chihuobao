const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const ShopOrder = new mongoose.Schema({
  _id: {
    type: ObjectId,
    ref: 'UserOrder'
  },
  user_id: {
    type: ObjectId,
    ref: 'User'
  },
  shop_id: {
    type: ObjectId,
    ref: 'Shop'
  },
  food_list: String,
  order_amount: Number,
  order_status: {
    type: Number,
    default: 1
  },
  is_comment: {
    type: Number,
    default: 0
  },
  order_update_time: {
    type: Date,
    default: Date.now()
  },
  order_create_time: {
    type: Date,
    default: Date.now()
  },
  total_time: {   // 累计配送的分钟数，用于求平均送达时间
    type: Number,
    default: 0
  },
  order_remarks: String,
  accept_address: String
})
ShopOrder.pre('save', function (next) {
  this.order_update_time = Date.now()
  next()
})
module.exports = mongoose.model('ShopOrder', ShopOrder)
