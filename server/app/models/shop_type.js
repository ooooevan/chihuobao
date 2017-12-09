const mongoose = require('mongoose')

const ShopType = new mongoose.Schema({
  type: String,
  code: Number,
  create_time: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('ShopType', ShopType)
