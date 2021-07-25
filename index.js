const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const passport = require('passport')
require('./utils/authStrategies/localStrategies')
require('./utils/db.config')
const authRoutes = require('./routes/authRoutes')
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
// app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: '63d3d020211add69b30eda68f72afcad4a05f295',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/', authRoutes)

app.get('/', (req, res) => {
  try {
    req.session.views = (req.session.views || 0) + 1
    console.log('User: ', req.user)
    return res.render('index')
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
})

app.listen(3000, () => {
  console.log('Server running at port 3000')
})

module.exports = app
