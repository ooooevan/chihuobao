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
  level: Number,
  dish_type: Number,
  monthly_sales: Number
})
module.exports = mongoose.model('MenuModel', Menu)
