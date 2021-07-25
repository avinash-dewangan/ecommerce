const express = require('express')
const router = express.Router()
const { addUser } = require('../modules/users/services/userServices')
const { registerSchema } = require('../modules/users/validations/authValidation')
const { joiErrorFormatter, mongooseErrorFormatter } = require('../utils/validationFromater')

const m1 = (req, res, next) => {
  req.user = 'Guest'
  next()
}
const m2 = (req, res, next) => {
  console.log(req.url)
  next()
}

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
      return res.render('register', {
        message: {
          type: 'error',
          body: 'Validation Error'
        },
        errors: joiErrorFormatter(validationResult.error),
        formData: req.body
      })
    }
    const user = await addUser(req.body)
    return res.render('register', {
      message: {
        type: 'success',
        body: 'Registration Success'
      },
      errors: {},
      formData: req.body
    })
  } catch (error) {
    console.error(error)
    return res.status(400).render('register', {
      message: {
        type: 'error',
        body: 'Validation Error'
      },
      errors: mongooseErrorFormatter(error),
      formData: req.body
    })
  }
})

/**
 * Show page for user login
 */
router.get('/login', (req, res) => {
  return res.render('login', { message: {}, errors: {}, formData: {} })
})

/**
 * logs in a user
 */
router.post('/login', m1, m2, (req, res) => {
  console.log(req.user)
  return res.render('login',
    {
      message: {
        type: 'success',
        body: 'Login Success'
      },
      errors: {},
      formData: {}
    })
})

const logMid = (req, res, next) => {

}

module.exports = router
