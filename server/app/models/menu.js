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
  dish_pics: String
})

module.exports = mongoose.model('MenuModel', Menu)
