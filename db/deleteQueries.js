const db = require("./pool");

const deleteBookById = async (bookId) => {
  const query = `DELETE FROM books WHERE id = $1 RETURNING *;`;
  // const bookGenreQuery = `DELETE FROM book_genres WHERE book_id = $1;`;
  // const bookAuthorQuery = `DELETE FROM book_authors WHERE book_id = $1;`;
  //
  // // First, delete associations in junction tables
  // try {
  //   await db.query(bookGenreQuery, [bookId]);
  //   await db.query(bookAuthorQuery, [bookId]);
  // } catch (err) {
  //   console.error("Error deleting book associations:", err);
  //   throw err;
  // }

  // Then, delete the book itself
  const values = [bookId];
  try {
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (err) {
    console.error("Error deleting book:", err);
    throw err;
  }
};

const deleteAuthorById = async (authorId) => {
  const query = `DELETE FROM authors WHERE id = $1 RETURNING *;`;
  const values = [authorId];
  try {
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (err) {
    console.error("Error deleting author:", err);
    throw err;
  }
};

const deleteGenreById = async (genreId) => {
  const query = `DELETE FROM genres WHERE id = $1 RETURNING *;`;
  const values = [genreId];
  try {
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (err) {
    console.error("Error deleting genre:", err);
    throw err;
  }
};

module.exports = {
  deleteBookById,
  deleteAuthorById,
  deleteGenreById,
};
