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
  shop_auto_images: String
})

module.exports = mongoose.model('UserApply', Apply)
