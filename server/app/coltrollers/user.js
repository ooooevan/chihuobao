const mongoose = require('mongoose')
const User = mongoose.model('User')

// User.create({name: 'evan', password: '123123123', role: 9})

// new User({name: 'new', password: 'ddddd'}).save(function (err) {
//   if (err) console.log(err)
// })
module.exports = User
