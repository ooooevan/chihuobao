const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

const UserSchema = new mongoose.Schema({
  user_name: {
    type: String
  },
  user_pwd: String,
  phone_num: Number,
  is_merchant: {
    type: Number,
    default: 0
  },
  createAt: {
    type: Date,
    default: Date.now()
  },
  updateAt: {
    type: Date,
    default: Date.now()
  }
})

UserSchema.pre('save', function (next) {
  const user = this
  if (this.isNew) {
    this.createAt = this.updateAt = Date.now()
  } else {
    this.updateAt = Date.now()
  }
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err)
    bcrypt.hash(user.user_pwd, salt, function (err, hash) {
      if (err) return next(err)
      user.user_pwd = hash
      next()
    })
  })
})
UserSchema.statics = {
  fetch: function (cb) {
    return this
      .find({})
      .sort('updateAt')
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

module.exports = mongoose.model('User', UserSchema)
