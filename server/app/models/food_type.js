const mongoose = require('mongoose')
const FoodTypeSchema = require('../schemas/food_type')
const FoodTypeModel = mongoose.model('DishComment', FoodTypeSchema)

module.exports = FoodTypeModel
