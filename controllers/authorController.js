const db = require("../db/queries");
const insertQueries = require("../db/insertQueries");

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

module.exports = {
  getAuthorsPage,
  getAddAuthorPage,
  postAddAuthor,
};
