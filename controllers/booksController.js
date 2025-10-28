const db = require('../db/queries')
const { format } = require('date-fns')

const getBooksIndex = async (req, res) => {
  const books = await db.getAllBooks()
  res.render('books/index', { title: 'Books', books })
}

const getBookDetails = async (req, res) => {
  const bookId = req.params.id
  const book = await db.getBookById(bookId)
  const publishedDate = format(new Date(book.published_date), 'dd MMMM yyyy')
  console.log(book)
  res.render('books/details', { title: 'Book Details', book, publishedDate })
}


module.exports = {
  getBooksIndex,
  getBookDetails
}
