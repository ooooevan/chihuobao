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
  shop_abstract: String,
  shop_location: String,
  shop_announcement: String,
  shop_status: Number,
  shop_phone: Number,
  shop_work_time: String,
  shop_delivery_cost: Number,
  shop_start_delivery: String,
  shop_stores_images: String,
  shop_detail_images: String,
  shop_longitude: Number,
  shop_latitude: Number,
  city_code: Number
})

module.exports = mongoose.model('Shop', Shop)
