// first read the env file
require('dotenv').config()

const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const logger = require('morgan')

require('./utils/db.config')
const MongoStore = require('connect-mongo')

const passport = require('passport')
require('./utils/authStratagies/localStratagies')

const { authMiddlware, flasherMiddleware } = require('./middleware')

const authRoutes = require('./routes/authRoutes')


const app = express()

// for env config
const config = require('./utils/config')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')

// app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: '63d3d020211add69b30eda68f72afcad4a05f295',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  store: MongoStore.create({ mongoUrl: config.mongoUrl })
}))

// static file serve
app.use(express.static('public'))

app.use(passport.initialize())
app.use(passport.session())

// logger console in server terminal
app.use(logger('dev'))

/**
 * Globel middleware to make logged in user avilable to the views
 */
app.use((req, res, next) => {
  res.locals.user = (req.isAuthenticated()) ? req.user : null
  return next()
})

// This for view repetative variable every routes for command to call
// console.log('App locals', app.locals)
app.locals.message = {}
app.locals.errors = {}
app.locals.formData = {}

app.use('/', authRoutes)

app.get('/', flasherMiddleware, (req, res) => {
  try {
    // console.log('User: ', req.user)
    return res.render('index')
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
})
app.get('/homepage', authMiddlware, (req, res) => {
  // res.send(`Welecome ${req.user.name}`)
  res.render('dashboard')
})

// make sure create 404 middleware after all routes
app.use((req, res, next) => {
  res.status(404).render('404')
})

app.listen(config.port, () => {
  console.log(`Server running at port ${config.port}`)
})

module.exports = app
