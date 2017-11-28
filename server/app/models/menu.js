const mongoose = require('mongoose')
const MenuSchema = require('../schemas/menu')
const MenuModel = mongoose.model('MenuModel', MenuSchema)

module.exports = MenuModel
