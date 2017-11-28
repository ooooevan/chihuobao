const mongoose = require('mongoose')
const UserSchema = require('../schemas/user_datail')
const UserDetail = mongoose.model('UserDetail', UserSchema)

module.exports = UserDetail
