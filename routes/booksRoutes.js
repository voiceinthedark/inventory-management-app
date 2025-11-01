const express = require("express");
const { Router } = express;
const booksController = require("../controllers/booksController");

const booksRouter = Router();

booksRouter.get("/", booksController.getBooksIndex);
booksRouter.get("/:id/details", booksController.getBookDetails);
booksRouter.get("/add", booksController.getAddBookForm);
booksRouter.post("/add", booksController.postAddNewBook);
booksRouter.post("/:id/delete", booksController.postDeleteBook);

module.exports = booksRouter;
