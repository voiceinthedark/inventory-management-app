const express = require('express')
const { Router } = express
const db = require('../db/queries')

const booksRouter = Router()

booksRouter.get('/', async (req, res) => {
  const books = await db.getAllBooks()
  res.render('books/index', { title: 'Books', books })
})

module.exports = booksRouter
