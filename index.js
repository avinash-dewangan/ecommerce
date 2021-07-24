const express = require('express')
require('./utils/db.config')
const app = express()


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

app.listen(3000, () => {
  console.log('Server running at port 3000')
})

module.exports = app
