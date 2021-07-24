const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [2, 'Name can\'t be smaller then 2 charactors'],
    maxlength: [64, 'Name can\'t be grater then 64 charactors']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    maxlength: [128, 'Name can\'t be grater then 128 charactors'],
    createIndexes: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isDeleated: {
    type: Boolean,
    default: false
  }

}, {
  timestamps: true
})

const User = mongoose.model('user', userSchema)
module.exports = User
