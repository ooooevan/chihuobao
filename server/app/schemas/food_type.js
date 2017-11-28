const mongoose = require('mongoose')

const FoodType = new mongoose.Schema({
  type: String,
  create_time: Date
})

module.exports = FoodType
