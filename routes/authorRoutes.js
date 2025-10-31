const express = require("express");
const { Router } = express;

const db = require("../db/queries.js");

const authorRouter = Router();

authorRouter.get("/", async (req, res) => {
  const authors = await db.getAllAuthors();
  res.render("authors/index", { title: "Authors", authors });
});

module.exports = authorRouter;
