const express = require('express')
const router = express.Router()
const { addUser } = require('../modules/users/services/userServices')
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
    const user = await addUser(req.body)
    return res.render('register.ejs', { message: 'Registeration successfully' })
  } catch (error) {
    console.error(error)
    return res.status(400).render('register.ejs', { message: 'Somthing went wrong' })
  }
})

module.exports = router
