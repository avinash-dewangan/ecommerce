const express = require('express')
const app = express()

app.get('/', (req, res) => {
  try {
    // throw new Error('foo')
    return res.send('Hello, World!!')
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
})

app.listen(3000, () => {
  console.log('Server running at port 3000')
})

module.exports = app
