const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const SALT_WORK_FACTOR = 10

const Admin = new mongoose.Schema({
  admin_name: String,
  admin_pwd: String,
  merchant_mp: {
    type: Number,
    default: 0
  },
  shop_type_mp: {
    type: Number,
    default: 0
  },
  shop_mp: {
    type: Number,
    default: 0
  },
  food_type_mp: {
    type: Number,
    default: 0
  },
  is_super: {
    type: Number,
    default: 0
  },
  create_at: {
    type: Date,
    default: Date.now()
  }
})

Admin.pre('save', function (next) {
  const admin = this
  this.create_at = Date.now()
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err)
    bcrypt.hash(admin.admin_pwd, salt, function (err, hash) {
      if (err) return next(err)
      admin.admin_pwd = hash
      next()
    })
  })
})

Admin.methods = {
  // 第一个参数是传入的（未加密的），第二个是数据库中的（是已经加密的）
  comparePassword: function (_pass, pass) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_pass, pass, (err, isMatch) => {
        if (!err) {
          resolve(isMatch)
        } else {
          reject(err)
        }
      })
    })
  }
}

module.exports = mongoose.model('Admin', Admin)
