const express = require("express");
const app = express();
const envFile = process.env.NODE_ENV === "production" ? ".prod.env" : ".env";
require("dotenv").config({ path: envFile });
const path = require("node:path");

const indexRouter = require("./routes/indexRoutes");
const booksRouter = require("./routes/booksRoutes");
const genresRouter = require("./routes/genresRoutes");
const authorsRouter = require("./routes/authorRoutes");

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Set EJS as templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// use indexrouter
app.use("/", indexRouter);
app.use("/books", booksRouter);
app.use("/genres", genresRouter);
app.use("/authors", authorsRouter);

// Start listening on port 5000
app.listen(PORT, (error) => {
  if (error) {
    console.log("Error starting server:", error);
  }
  console.log(`Server is running on port ${PORT}`);
});
