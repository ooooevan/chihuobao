const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

const UserSchema = new mongoose.Schema({
  user_name: {
    type: String
  },
  user_pwd: String,
  phone_num: {
    type: Number,
    unique: true
  },
  avator: String,
  gender: {
    type: Number,
    default: 1
  },
  accept_address: String,
  introduction: String,
  is_merchant: {   // 是否商户
    type: Number,
    default: 0
  },
  create_at: {
    type: Date,
    default: Date.now()
  },
  update_at: {
    type: Date,
    default: Date.now()
  }
})

UserSchema.pre('save', function (next) {
  const user = this
  if (this.isNew) {
    this.create_at = this.update_at = Date.now()
  } else {
    this.update_at = Date.now()
  }
  if (this.modify === 'modify') {
    next()
  } else {
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
      if (err) return next(err)
      bcrypt.hash(user.user_pwd, salt, function (err, hash) {
        if (err) return next(err)
        user.user_pwd = hash
        next()
      })
    })
  }
})
UserSchema.statics = {
  fetch: function (cb) {
    return this
      .find({})
      .sort('update_at')
      .exec(cb)
  },
  findById: function (id, cb) {
    return this
      .findOne({ _id: id })
      .exec(cb)
  }
}
UserSchema.methods = {
  // 第一个参数是传入的（未加密的），第二个是数据库中的（是已经加密的）
  comparePassword: function (_pass, pass) {
    return new Promise(function (resolve, reject) {
      bcrypt.compare(_pass, pass, function (err, isMatch) {
        if (!err) {
          resolve(isMatch)
        } else {
          reject(err)
        }
      })
    })
  }
}

module.exports = mongoose.model('User', UserSchema)
