const express = require('express')
const bodyParser = require('body-parser')
require('./utils/db.config')
const authRoutes = require('./routes/authRoutes')
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engin', 'ejs')

app.use('/', authRoutes)

app.get('/', (req, res) => {
  try {
    // throw new Error('foo')
    // return res.send('Hello, World!!')
    return res.render('index.ejs')
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
})

app.listen(3000, () => {
  console.log('Server running at port 3000')
})

module.exports = app
