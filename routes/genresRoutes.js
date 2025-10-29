const express = require("express");
const { Router } = express;
const genresController = require("../controllers/genresController");

const genresRouter = Router();

// GET /genres - Retrieve all genres
genresRouter.get("/", genresController.getGenreIndex);
genresRouter.get("/:genreId", genresController.getBooksByGenre);

module.exports = genresRouter;
