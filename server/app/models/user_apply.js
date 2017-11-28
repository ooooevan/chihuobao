const mongoose = require('mongoose')
const ApplySchema = require('../schemas/shop_apply')
const ApplyModel = mongoose.model('userApply',ApplySchema)

module.exports = ApplyModel
