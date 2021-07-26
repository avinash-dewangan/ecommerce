const authMiddlware = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log('Login status : ', req.isAuthenticated())
    return next()
  } else {
    res.redirect('/login')
  }
}

module.exports = authMiddlware
