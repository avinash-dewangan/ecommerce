const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [2, 'Name can\'t be smaller then 2 charactors'],
    maxlength: [64, 'Name can\'t be grater then 64 charactors']
  },
  email: {
    type: String,
    lowercase: true,
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

userSchema.pre('save', async function (next) {
  // do stuff
  if (!this.isModified('password')) next()

  this.password = await bcrypt.hash(this.password, 10)
  next()
})
userSchema.methods.checkPassword = async function (password) {
  // if (password != null && this.password != null) {
  console.log('insidelocal straties', password, this.password)
  const result = await bcrypt.compare(password, this.password)
  return result
  // }
}

const User = mongoose.model('user', userSchema)
module.exports = User
