const db = require("../db/queries");
const insertQueries = require("../db/insertQueries");
const deleteQueries = require("../db/deleteQueries");

const getAuthorsPage = async (req, res) => {
  const authors = await db.getAllAuthors();
  res.render("authors/index", { title: "Authors", authors });
};

const getAddAuthorPage = (req, res) => {
  res.render("authors/add", { title: "Add New Author" });
};

const postAddAuthor = async (req, res) => {
  const { name, bio, birthdate, nationality } = req.body;
  try {
    await insertQueries.insertNewAuthor(name, bio, birthdate, nationality);
    res.redirect("/authors");
  } catch (err) {
    console.error("Error adding new author:", err);
    res.status(500).send("Internal Server Error");
  }
};

const postDeleteAuthor = async (req, res) => {
  const authorId = req.params.id;
  try {
    await deleteQueries.deleteAuthorById(authorId);
    res.redirect("/authors");
  } catch (error) {
    console.error("Error deleting author:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAuthorsPage,
  getAddAuthorPage,
  postAddAuthor,
  postDeleteAuthor,
};
