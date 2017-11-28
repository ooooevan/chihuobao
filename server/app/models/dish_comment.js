const mongoose = require('mongoose')
const DishCommentSchema = require('../schemas/dish_comment')
const DishCommentModel = mongoose.model('DishComment', DishCommentSchema)

module.exports = DishCommentModel
