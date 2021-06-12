const express = require('express')
const Router = express.Router()
const db = require('../../models')
const router = require('./home')
const Todo = db.Todo

router.get('new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const { name } = req.body.name

})





router.get('/:id', (req, res) => {
  const { id } = req.params
  return Todo.findByPk(id)
    .then((todo) => { return res.render('detail', { todo: todo.toJSON() }) })
    .catch((err) => { return res.status(400).toJSON(err) })
})

module.exports = router
