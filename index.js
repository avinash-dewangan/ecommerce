const express = require('express')
const bodyParser = require('body-parser')
const User = require('./models/User')
require('./utils/db.config')
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engin', 'ejs')

app.get('/', (req, res) => {
  try {
    // throw new Error('foo')
    // return res.send('Hello, World!!')
    return res.render('index.ejs')
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
})

app.get('/register', (req, res) => {
  try {
    // throw new Error('foo')
    // return res.send('Hello, World!!')
    return res.render('register.ejs')
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
})

app.post('/register', async (req, res) => {
  const user = new User(req.body)
  await user.save()
  return res.render('register.ejs', { message: 'Registeration successfully' })
})

app.listen(3000, () => {
  console.log('Server running at port 3000')
})

module.exports = app
