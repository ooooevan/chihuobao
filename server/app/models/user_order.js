const mongoose = require('mongoose')
const UserSchema = require('../schemas/user_order')
const UserOrder = mongoose.model('UserOrder', UserSchema)

module.exports = UserOrder
