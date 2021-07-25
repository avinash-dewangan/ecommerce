const express = require('express')
const router = express.Router()
const { addUser } = require('../modules/users/services/userServices')
const { registerSchema } = require('../modules/users/validations/authValidation')
const { joiErrorFormatter, mongooseErrorFormatter } = require('../utils/validationFromater')

/**
 * Show page for user registration
 */
router.get('/register', (req, res) => {
  return res.render('register.ejs', { message: {}, errors: {}, formData: {} })
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
      return res.render('register.ejs', {
        message: {
          type: 'error',
          body: 'Validation Error'
        },
        errors: joiErrorFormatter(validationResult.error),
        formData: req.body
      })
    }
    const user = await addUser(req.body)
    return res.render('register.ejs', {
      message: {
        type: 'success',
        body: 'Registration Success'
      },
      errors: {},
      formData: req.body
    })
  } catch (error) {
    console.error(error)
    return res.status(400).render('register.ejs', {
      message: {
        type: 'error',
        body: 'Validation Error'
      },
      errors: mongooseErrorFormatter(error),
      formData: req.body
    })
  }
})

module.exports = router
