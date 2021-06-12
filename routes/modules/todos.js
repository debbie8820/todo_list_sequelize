const express = require('express')
const Router = express.Router()
const db = require('../../models')
const router = require('./home')
const Todo = db.Todo
const User = db.User

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const { name } = req.body
  const UserId = req.user.id
  Todo.create({ name, UserId })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.get('/:id/edit', (req, res) => {
  const { id } = req.params
  const UserId = req.user.id
  Todo.findOne({ where: { id, UserId } })
    .then((todo) => {
      todo = todo.toJSON()
      res.render('edit', { todo })
    })
    .catch(err => console.log(err))
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const UserId = req.user.id
  const isDone = req.body.isDone
  Todo.findOne({ where: { id, UserId } })
    .then((todo) => {
      Object.assign(todo, req.body)
      todo.isDone = isDone === "on"
      todo.save()
    })
    .then((todo) => res.redirect('/'))
    .catch(err => console.log(err))
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  return Todo.findByPk(id)
    .then((todo) => { return res.render('detail', { todo: todo.toJSON() }) })
    .catch((err) => { return res.status(400).toJSON(err) })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  const UserId = req.user.id
  Todo.findOne({ where: { id, UserId } })
    .then((todo) => todo.destroy())
    .then((todo) => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router
