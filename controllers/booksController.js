const db = require("../db/queries");
const insertQueries = require("../db/insertQueries");
const { format } = require("date-fns");

const getBooksIndex = async (req, res) => {
  const books = await db.getAllBooks();
  res.render("books/index", { title: "Books", books });
};

const getBookDetails = async (req, res) => {
  const bookId = req.params.id;
  const book = await db.getBookById(bookId);
  const publishedDate = book.published_date;
  console.log(book);
  res.render("books/details", { title: "Book Details", book, publishedDate });
};

const getAddBookForm = async (req, res) => {
  const authors = await db.getAllAuthors();
  const genres = await db.getAllGenres();
  res.render("books/books-add", { title: "Add New Book", authors, genres });
};

const postAddNewBook = async (req, res) => {
  const { title, summary, published_date, author, genre } = req.body;

  try {
    await insertQueries.insertNewBook(
      title,
      summary,
      "/images/default-book-cover.jpg",
      published_date,
      author,
      genre,
    );
    res.redirect("/books");
  } catch (error) {
    console.error("Error adding new book:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getBooksIndex,
  getBookDetails,
  getAddBookForm,
  postAddNewBook,
};
