const guestMiddlware = (req, res, next) => {
  if (!req.isAuthenticated()) {
    console.log(req.isAuthenticated())
    return next()
  }
  res.redirect('/homepage')
}

module.exports = guestMiddlware
