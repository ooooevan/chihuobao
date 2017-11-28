const mongoose = require('mongoose')
const ShopTypeSchema = require('../schemas/shop_type')
const ShopTypeModel = mongoose.model('DishComment', ShopTypeSchema)

module.exports = ShopTypeModel
