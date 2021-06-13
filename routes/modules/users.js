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

router.post('/login', (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    req.flash('warning_msg', '請填寫所有欄位')
    return res.render('login', { email, password })
  }
  next()
},
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })
)

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
    return res.render('register', { errors, name, email, password, confirmPassword })
  }

  return User.findOne({ where: { email } })
    .then((user) => {
      if (user) {
        req.flash('warning_msg', '此 Email 已註冊')
        return res.render('register', { name, email, password, confirmPassword })
      }
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({ name, email, password: hash }))
        .then(() => {
          req.flash('success_msg', '你已成功註冊')
          res.redirect('/users/login')
        })
        .catch(err => console.log(err))
    })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已成功登出')
  return res.redirect('/')
})

module.exports = router