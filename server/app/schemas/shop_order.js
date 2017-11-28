const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.types.ObjectId

const ShopOrder = new mongoose.Schema({
  user_id: {
    type: ObjectId,
    ref: 'User'
  },
  shop_id: {
    type: ObjectId,
    ref: 'Shop'
  },
  dish_id_list: String,
  time: Date,
  mongy: Number,
  order_status: Number
})

module.exports = ShopOrder
