const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const UserSchema = new mongoose.Schema({
  user_id: {
    type: ObjectId,
    ref: 'User'
  },
  accept_address: String,
  avator: String,
  gender: Number,
  introduction: String
})

module.exports = mongoose.model('UserDetail', UserSchema)
