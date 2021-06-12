const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ where: { email } })
      .then((user) => {
        if (!user) {
          console.log('此 Email 尚未註冊')
          return done(null, false)
        }
        return bcrypt
          .compare(password, user.password)
          .then((isMatch) => {
            if (isMatch) return done(null, user)
            return done(null, false, { message: 'Email or Password incorrect.' })
          })
          .catch(err => done(err, null))
      })
  }))
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findByPk(id)
      .then((user) => {
        user = user.toJSON()
        done(null, user)
      })
      .catch(err => done(err, null))
  })
}