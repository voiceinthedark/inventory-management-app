const express = require("express");
const { Router } = express;
const db = require("../db/queries");

const genresRouter = Router();

// GET /genres - Retrieve all genres
genresRouter.get("/", async (req, res) => {
  try {
    const genres = await db.getAllGenres();
    res.render("genres/index", { genres });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

genresRouter.get("/:genreId", async (req, res) => {
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
});

module.exports = genresRouter;
