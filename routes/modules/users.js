const express = require('express')
const user = require('../../models/user')
const router = express.Router()
const db = require('../../models')
const User = db.User
const Todo = db.Todo

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  res.send('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, password, email } = req.body
  User.create({
    name, email, password
  }).then(() => res.redirect('/'))
})

router.get('/logout', (req, res) => {
  res.send('logout')
})

module.exports = router