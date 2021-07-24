const User = require('../models/User')
/**
 * create a new user and returns it
 * @param {Object} userInput - It is user input with all variables for user model
 */
const addUser = async (userInput) => {
  const user = new User(userInput)
  await user.save()
  return user
}

module.exports = { addUser }
