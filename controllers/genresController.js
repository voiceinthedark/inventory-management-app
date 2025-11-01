const db = require("../db/queries");
const insertQueries = require("../db/insertQueries");

const getGenreIndex = async (req, res) => {
  try {
    const genres = await db.getAllGenres();
    res.render("genres/index", { genres });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getBooksByGenre = async (req, res) => {
  const { genreId } = req.params;
  try {
    const books = await db.getBooksByGenre(genreId);
    console.log(books);
    res.render("genres/genre-books", {
      genre: books.length > 0 ? books[0].genre_name : "Unknown Genre",
      books,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAddGenreForm = (req, res) => {
  console.log("Rendering add genre form");
  res.render("genres/add", { title: "Add new genre " });
};

const postAddGenre = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newGenre = await insertQueries.insertNewGenre(name, description);
    res.redirect("/genres");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getGenreIndex,
  getBooksByGenre,
  postAddGenre,
  getAddGenreForm,
};
