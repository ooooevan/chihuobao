const mongoose = require('mongoose')
const Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

const Order = new mongoose.Schema({
  user_id: {
    type: ObjectId,
    ref: 'User'
  },
  shop_id: Number,
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

module.exports = Order
