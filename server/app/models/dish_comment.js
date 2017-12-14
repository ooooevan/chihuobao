const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const DishComment = new mongoose.Schema({
  dish_id: {
    type: ObjectId,
    ref: 'MenuModel'
  },
  shop_id: {
    type: ObjectId,
    ref: 'Shop'
  },
  order_id: {
    type: ObjectId,
    ref: 'UserOrder'
  },
  user_id: {
    type: ObjectId,
    ref: 'User'
  },
  level: {
    type: Number,
    default: 0
  },
  comment: String,
  comment_date: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('DishComment', DishComment)
