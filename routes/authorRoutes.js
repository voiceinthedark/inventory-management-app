const express = require("express");
const { Router } = express;

const db = require("../db/queries.js");
const authorController = require("../controllers/authorController");

const authorRouter = Router();

authorRouter.get("/", authorController.getAuthorsPage);

authorRouter.get("/add", authorController.getAddAuthorPage);
authorRouter.post("/add", authorController.postAddAuthor);

module.exports = authorRouter;
