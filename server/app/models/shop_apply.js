const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const Apply = new mongoose.Schema({
  user_id: {
    type: ObjectId,
    ref: 'User'
  },
  identification_num: String,   // 身份证号码
  identification_pic: String,   // 身份证照片
  shop_name: String,
  shop_logo: String,
  shop_abstract: String,
  shop_location: String,
  shop_auth_images: String, // 门面照1111
  shop_type: Number,
  shop_longitude: Number,
  shop_latitude: Number,
  status: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('ShopApply', Apply)
