const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const Apply = new mongoose.Schema({
  user_id: {
    type: ObjectId,
    ref: 'User'
  },
  identification_num: String,
  identification_pic: String,
  shop_name: String,
  shop_logo: String,
  shop_abstract: String,
  shop_location: String,
  shop_auth_images: String, // 门面照
  shop_type: Number,
  longitude: Number,
  latitude: Number,
  status: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('ShopApply', Apply)
