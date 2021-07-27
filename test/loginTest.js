const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')

// Configure chai
chai.use(chaiHttp)
chai.should()

// BDD Testing (Behavioral Driven Development)
// TDD Testing (Driven Development)

// register get requrest
describe('Make sure server is returning login page', () => {
  it('should return a page with status 200', (done) => {
    chai.request(app)
      .get('/login')
      .end((err, res) => {
        if (err) return done(err)
        res.should.have.status(200)
        done()
      })
  })
})


// register post requrest with valid data
describe('Make sure login is successful with valid data', () => {
  it('should return success in response', (done) => {
    // chai.request(app)
    const agent = chai.request.agent(app)
    agent
      .post('/login')
      .type('form')
      .send({
        email: 'avi@gmail.com',
        password: 'avi@gmail.com'
      })
      .end((err, res) => {
        if (err) return done(err)
        res.should.have.status(200)
        done()
      })
  })
})



// login post requrest with empty data
describe('login post request with empty data ', () => {
  it('should return error in response', (done) => {
    // chai.request(app)
    const agent = chai.request.agent(app)
    agent
      .post('/login')
      .type('form')
      .end((err, res) => {
        //console.log(res.text)
        if (err) return done(err)
        res.should.have.status(200)
        res.text.should.contain('Missing credentials')
        done()
      })
  })
})



// login post requrest with incorrect username
describe('login post request with incorrect username ', () => {
  it('should return error in response', (done) => {
    // chai.request(app)
    const agent = chai.request.agent(app)
    agent
      .post('/login')
      .type('form')
      .send({
        email: 'avi@gmailddd.com',
        password: 'avi@gmail.com'
      })
      .end((err, res) => {
        //console.log(res.text)
        if (err) return done(err)
        res.should.have.status(200)
        res.text.should.contain('Incorrect username.')
        done()
      })
  })
})

// login post requrest with incorrect password
describe('login post request with incorrect Passowrd', () => {
  it('should return error in response', (done) => {
    // chai.request(app)
    const agent = chai.request.agent(app)
    agent
      .post('/login')
      .type('form')
      .send({
        email: 'avi@gmail.com',
        password: 'avi@gmaildsafsd.com'
      })
      .end((err, res) => {
        // console.log(res.text)
        if (err) return done(err)
        res.should.have.status(200)
        res.text.should.contain('Incorrect password.')
        done()
      })
  })
})
