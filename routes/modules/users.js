const express = require('express')
const user = require('../../models/user')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')
const db = require('../../models')
const User = db.User
const Todo = db.Todo

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '請填寫所有欄位' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼和確認密碼不符合' })
  }

  if (errors.length) {
    console.log('欄位有問題')
    return res.render('register', { name, email, password, confirmPassword })
  }

  return User.findOne({ where: { email } })
    .then((user) => {
      if (user) {
        console.log('此 Email 已註冊')
        return res.render('register', { name, email, password, confirmPassword })
      }
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({ name, email, password: hash }))
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
})

router.get('/logout', (req, res) => {
  req.logout()
  return res.redirect('/')
})

module.exports = router