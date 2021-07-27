const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')

// Configure chai
chai.use(chaiHttp)
chai.should()

// BDD Testing (Behavioral Driven Development)
// TDD Testing (Driven Development)

// register get requrest
describe('Make sure server is returning registration page', () => {
  it('shout return a page with status 200', (done) => {
    chai.request(app)
      .get('/register')
      .end((err, res) => {
        if (err) return done(err)
        res.should.have.status(200)
        done()
      })
  })
})

// register post requrest with empty data
describe('Make sure register fails on no data', () => {
  it('shout return validation errors', (done) => {
    // chai.request(app)
    const agent = chai.request.agent(app)
    agent
      .post('/register')
      .type('form')
      .end((err, res) => {
        if (err) return done(err)
        res.text.should.contain('Validation Error')
        done()
      })
  })
})

// register post requrest with valid data
describe('Make sure register is successful with valid data', () => {
  it('shout return success in response', (done) => {
    // chai.request(app)
    const agent = chai.request.agent(app)
    agent
      .post('/register')
      .type('form')
      .send({
        name: 'john doe',
        email: `john.${new Date().getTime()}withValidData@example.com`,
        password: '123456789',
        repeat_password: '123456789'

      })
      .end((err, res) => {
        if (err) return done(err)
        res.should.have.status(200)
        done()
      })
  })
})

// register post requrest with unique email create and test second test same email
const email = `john.${new Date().getTime()}UniqueEmailCheck@example.com`
describe('Make sure register is unique email create', () => {
  it('shout return success in response', (done) => {
    // chai.request(app)
    const agent = chai.request.agent(app)
    agent
      .post('/register')
      .type('form')
      .send({
        name: 'john doe',
        email: email,
        password: '123456789',
        repeat_password: '123456789'

      })
      .end((err, res) => {
        if (err) return done(err)
        res.should.have.status(200)
        done()
      })
  })
})

// test unique email
describe('should return validation error about unique email', () => {
  it('shout return success in response', (done) => {
    // chai.request(app)
    const agent = chai.request.agent(app)
    agent
      .post('/register')
      .type('form')
      .send({
        email: email,
        name: 'john doe',
        password: '123456789',
        repeat_password: '123456789'

      })
      .end((err, res) => {
        //  console.log(res.text)
        if (err) return done(err)
        res.should.have.status(400)
        res.text.should.contain('Validation Error')
        res.text.should.contain(' Email already exist')
        done()
      })
  })
})
