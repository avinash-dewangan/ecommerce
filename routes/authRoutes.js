const express = require('express')
const router = express.Router()
const { addUser } = require('../modules/users/services/userServices')
const { registerSchema } = require('../modules/users/validations/authValidation')
const { joiErrorFormatter, mongooseErrorFormatter } = require('../utils/validationFromater')
const passport = require('passport')
const guestMiddleware = require('../middleware/guestMiddlewares')

/**
 * Show page for user registration
 */
router.get('/register', guestMiddleware, (req, res) => {
  return res.render('register' /* , { message: {}, errors: {}, formData: {} } */)
})

/**
 * handle user registration
 */
router.post('/register', guestMiddleware, async (req, res) => {
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
      //errors: {}, // for common to all configure index.js
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
router.get('/login', guestMiddleware, (req, res) => {
  return res.render('login' /* , { message: {}, errors: {}, formData: {} } */)
})

/**
 * logs in a user
 */
router.post('/login',
  guestMiddleware,
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }), (req, res) => {
    return res.render('login',
      {
        message: {
          type: 'success',
          body: 'Login Success'
        }
        //,
        // errors: {},    //configure in index.js
        // formData: {}
      })
  })

module.exports = router
