const { Router } = require('express')
const indexRouter = Router()
const { getIndexPage} = require('../controllers/indexController')

// Home Router
indexRouter.get('/', getIndexPage)

module.exports = indexRouter
