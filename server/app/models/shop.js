const mongoose = require('mongoose')
const ShopSchema = require('../schemas/shop')
const ShopModel = mongoose.model('Shop', ShopSchema)

module.exports = ShopModel
