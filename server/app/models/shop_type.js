const mongoose = require('mongoose')

const ShopType = new mongoose.Schema({
  type: String,
  create_time: Date
})

module.exports = mongoose.model('ShopType', ShopType)
