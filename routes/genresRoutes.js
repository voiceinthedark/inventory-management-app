const express = require("express");
const { Router } = express;
const genresController = require("../controllers/genresController");

const genresRouter = Router();

// GET /genres - Retrieve all genres
genresRouter.get("/", genresController.getGenreIndex);
// GET /genres/add - Form to add a new genre
genresRouter.get("/add", genresController.getAddGenreForm);
// POST /genres - Add a new genre
genresRouter.post("/add", genresController.postAddGenre);
// POST /genres/:genreId/delete - Delete a genre
genresRouter.post("/:genreId/delete", genresController.postDeleteGenre);
// GET /genres/:genreId - Retrieve books by genre
genresRouter.get("/:genreId", genresController.getBooksByGenre);

module.exports = genresRouter;
