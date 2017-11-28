const mongoose = require('mongoose')
const AdminSchema = require('../schemas/admin')
const AdminModel = mongoose.model('MenuModel', AdminSchema)

module.exports = AdminModel
