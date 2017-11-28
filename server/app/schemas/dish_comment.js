const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const DishComment = new mongoose.Schema({
  dish_id: {
    type: ObjectId,
    ref: 'Menu'
  },
  shop_id: {
    type: ObjectId,
    ref: 'Shop'
  },
  user_id: {
    type: ObjectId,
    ref: 'User'
  },
  isComment: Number,
  message: String,
  reply_comment_id: {
    type: ObjectId,
    ref: 'Comment'
  }
})

module.exports = DishComment
