const mongoose = require('mongoose')

const DishType = new mongoose.Schema({
  type: String,
  create_time: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('DishType', DishType)
