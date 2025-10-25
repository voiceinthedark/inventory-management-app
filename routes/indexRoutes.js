const { Router } = require('express')
const indexRouter = Router()

// Home Router
indexRouter.get('/', (req, res) => {
  res.render('index', { title: "Home Page" })
})


module.exports = indexRouter
