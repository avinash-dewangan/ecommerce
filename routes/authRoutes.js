const express = require('express')
const router = express.Router()
const { addUser } = require('../modules/users/services/userServices')
const { registerSchema } = require('../modules/users/validations/authValidation')
const { joiErrorFormatter, mongooseErrorFormatter } = require('../utils/validationFromater')
const passport = require('passport')
const guestMiddleware = require('../middleware/guestMiddlewares')
const authMiddleware = require('../middleware/authMiddlewares')
const flasherMiddlewares = require('../middleware/flasherMiddlewares')

/**
 * Show page for user registration
 */
router.get('/register', guestMiddleware, flasherMiddlewares, (req, res) => {
  return res.render('register' /* , { message: {}, errors: {}, formData: {} } */)
})

// resusable method for flash data messanger
const flashDataMessanger = (req, res, type, body, errors = null, formData = null) => {
  req.session.flashData = {
    message: {
      type: type,
      body: body
    },
    errors: errors,
    formData: formData
  }
}

/**
 * handle user registration
 */
router.post('/register', guestMiddleware, async (req, res) => {
  try {
    const validationResult = registerSchema.validate(req.body, {
      abortEarly: false
    })
    if (validationResult.error) {
      req.session.flashData = {
        message: {
          type: 'error',
          body: 'Validation Error'
        },
        errors: joiErrorFormatter(validationResult.error),
        formData: req.body
      }
      return res.redirect('/register')
    }
    const user = await addUser(req.body)
    req.session.flashData = {
      message: {
        type: 'success',
        body: 'Registration Success'
      },
      // errors: {}, // for common to all configure index.js
      formData: req.body
    }
    return res.redirect('register')
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
router.get('/login', guestMiddleware, flasherMiddlewares, (req, res) => {
  return res.render('login' /* , { message: {}, errors: {}, formData: {} } */)
})

/**
 * logs in a user
 */
router.post('/login',
  guestMiddleware,
  (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        console.error('Err:', err)
        req.session.flashData = {
          message: {
            type: 'error',
            body: 'Login Failed'
          }
        }
        return res.redirect('/login')
      }
      if (!user) {
        console.error('User:', user)
        req.session.flashData = {
          message: {
            type: 'error',
            body: info.message
          }
        }
        return res.redirect('/login')
      }
      req.logIn(user, (err) => {
        if (err) {
          console.error('Err:', err)
          req.session.flashData = {
            message: {
              type: 'error',
              body: 'Login Failed'
            }
          }
        }
        return res.redirect('/homepage')
      })
    })(req, res, next)
  }
)

/**
 * Logout a user
 */
router.get('/logout', authMiddleware, (req, res) => {
  flashDataMessanger(req, res, 'success', 'Logout Sucessfully')
  req.logout()
  res.redirect('/')
})

module.exports = router
