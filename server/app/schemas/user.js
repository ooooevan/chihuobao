const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')
// const SALT_WORK_FACTOR = 10

const UserSchema = new mongoose.Schema({
  user_name: {
    unique: true,
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
  // const user = this
  if (this.isNew) {
    this.createAt = this.updateAt = Date.now()
  } else {
    this.updateAt = Date.now()
  }
  next()
  // bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    // if (err) return next(err)
    // bcrypt.hash(user.password, salt, function (err, hash) {
    //   if (err) return next(err)
    //   user.password = hash
      // next()
    // })
  // })
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
      .findOne({_id: id})
      .exec(cb)
  }
}
// UserSchema.methods = {
  // comparePassword: function (_password, password) {
    // return function (cb) {
    //   bcrypt.compare(_password, password, function (err, isMatch) {
    //     cb(null, isMatch)
    //   })
    // }
  // }
// }
module.exports = UserSchema
