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
  user_order_code: String,
  order_amount: Number,
  order_status: String,
  order_create_time: Date,
  order_remarks: String,
  delivery_way: String,
  pay_way: String,
  accept_address: String
})

module.exports = mongoose.model('ShopOrder', ShopOrder)
