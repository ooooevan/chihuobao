const mongoose = require('mongoose')
const ShopOrderSchema = require('../schemas/shop_order')
const ShopOrderModel = mongoose.model('ShopOrder', ShopOrderSchema)

module.exports = ShopOrderModel
