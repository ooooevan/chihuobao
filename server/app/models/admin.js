const mongoose = require('mongoose')

const Admin = new mongoose.Schema({
  admin_name: String,
  admin_pwd: String,
  merchant_mp: Number,
  Shop_type_mp: Number,
  Food_type_mp: Number,
  is_super: Number,
  create_time: Date
})

module.exports = mongoose.model('Admin', Admin)
