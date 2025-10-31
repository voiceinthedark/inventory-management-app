const db = require("./pool");

const insertNewBook = async (
  title,
  summary,
  cover_image,
  published_date,
  author_id,
  genre_id,
) => {
  const query = `INSERT INTO books (title, summary, cover_image, published_date ) VALUES ($1, $2, $3, $4) RETURNING *;`;
  const values = [title, summary, cover_image, published_date];
  const qureyAuthorBook = `INSERT INTO book_authors(author_id, book_id) VALUES ($1, $2);`;
  const qureyGenreBook = `INSERT INTO book_genres(genre_id, book_id) VALUES ($1, $2);`;
  try {
    const result = await db.query(query, values);
    const bookId = result.rows[0].id;

    await db.query(qureyAuthorBook, [author_id, bookId]);
    await db.query(qureyGenreBook, [genre_id, bookId]);
    return result.rows[0];
  } catch (err) {
    console.error("Error inserting new book:", err);
    throw err;
  }
};

module.exports = {
  insertNewBook,
};
