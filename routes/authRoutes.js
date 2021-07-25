const express = require('express')
const router = express.Router()
const { addUser } = require('../modules/users/services/userServices')
const { registerSchema } = require('../modules/users/validations/authValidation')
const { joiErrorFormatter, mongooseErrorFormatter } = require('../utils/validationFromater')

/**
 * Show page for user registration
 */
router.get('/register', (req, res) => {
  return res.render('register.ejs', { message: null })
})

/**
 * handle user registration
 */
router.post('/register', async (req, res) => {
  try {
    const validationResult = registerSchema.validate(req.body, {
      abortEarly: false
    })
    if (validationResult.error) {
      // return res.send(joiErrorFormatter(validationResult.error))
      return res.render('register.ejs', { message: 'Validation Errors' })
    }
    const user = await addUser(req.body)
    return res.render('register.ejs', { message: 'Registeration successfully' })
  } catch (error) {
    console.error(error)
    return res.send(mongooseErrorFormatter(error))
    return res.status(400).render('register.ejs', { message: 'Somthing went wrong' })
  }
})

module.exports = router
