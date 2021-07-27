const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../../modules/users/models/User')

passport.use(new LocalStrategy({ usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email })

      if (!user) done(null, false, { message: 'Incorrect username.' })
      // console.log(password)
      // const result =
      if (await user.checkPassword(password)) done(null, user)
      done(null, false, { message: 'Incorrect password.' })
    } catch (error) {
      done(error)
    }
  })

)

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser(async (_id, done) => {
  try {
    const user = await User.findOne({ _id })
    done(null, user)
  } catch (e) {
    done(e)
  }
})
