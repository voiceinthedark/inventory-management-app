const express = require("express");
const { Router } = express;
const booksController = require("../controllers/booksController");

const booksRouter = Router();

booksRouter.get("/", booksController.getBooksIndex);
booksRouter.get("/:id/details", booksController.getBookDetails);
booksRouter.get("/add", booksController.getAddBookForm);
booksRouter.post("/add", booksController.postAddNewBook);

module.exports = booksRouter;
