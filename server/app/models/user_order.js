const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const Order = new mongoose.Schema({
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
  is_comment: {
    type: Number,
    default: 0
  },
  order_status: {
    type: Number,
    default: 1
  },
  order_create_time: {
    type: Date,
    default: Date.now()
  },
  order_remarks: String,
  accept_address: String
})

module.exports = mongoose.model('UserOrder', Order)
