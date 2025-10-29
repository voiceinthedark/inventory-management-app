const db = require("./pool");

/* Retrieve books/genres/authors queries
 * ----------------------------------------------------------
 * getFinishedReadingsBooks: Get all books marked as finished reading
 * getReadingBooks: Get all books currently being read
 * getToReadBooks: Get all books marked to read
 * getAllBooks: Get all books in the database
 * Includes title, summary, cover image, published date, and author name
 * getAllGenres: Get all genres in the database
 * getAllAuthors: Get all authors in the database
 * getAuthorsBooks: Get all books by a specific author
 * getBooksByGenre: Get all books in a specific genre
 * getBooksCount: Get the total count of books in the database
 */

async function getFinishedReadingsBooks() {
  const query = `
    SELECT b.title, b.summary, b.cover_image, b.published_date, a.name AS author_name
    FROM books b
    JOIN finished_readings fr ON b.id = fr.book_id
    JOIN book_authors ba ON b.id = ba.book_id
    JOIN authors a ON ba.author_id = a.id;
  `;
  const { rows } = await db.query(query);
  return rows;
}

const getReadingBooks = async () => {
  const query = `
    SELECT b.title, b.summary, b.cover_image, b.published_date, a.name AS author_name
    FROM books b
    JOIN reading r ON b.id = r.book_id
    JOIN book_authors ba ON b.id = ba.book_id
    JOIN authors a ON ba.author_id = a.id;
  `;
  const { rows } = await db.query(query);
  return rows;
};

const getToReadBooks = async () => {
  const query = `
    SELECT b.title, b.summary, b.cover_image, b.published_date, a.name AS author_name
    FROM books b
    JOIN to_read tr ON b.id = tr.book_id
    JOIN book_authors ba ON b.id = ba.book_id
    JOIN authors a ON ba.author_id = a.id;
  `;
  const { rows } = await db.query(query);
  return rows;
};

const getAllBooks = async () => {
  const query = `
    SELECT b.id, b.title, b.summary, b.cover_image, b.published_date, a.name AS author_name, g.name AS genre_name
    FROM books b
    JOIN book_authors ba ON b.id = ba.book_id
    JOIN authors a ON ba.author_id = a.id 
    JOIN book_genres bg ON b.id = bg.book_id
    JOIN genres g ON bg.genre_id = g.id;
  `;
  const { rows } = await db.query(query);
  return rows;
};

const getBookById = async (bookId) => {
  const query = `
    SELECT b.title, b.summary, b.cover_image, b.published_date, a.name AS author_name, g.name AS genre_name
    FROM books b
    JOIN book_authors ba ON b.id = ba.book_id
    JOIN authors a ON ba.author_id = a.id 
    JOIN book_genres bg ON b.id = bg.book_id
    JOIN genres g ON bg.genre_id = g.id
    WHERE b.id = $1;
  `;
  const { rows } = await db.query(query, [bookId]);
  return rows[0];
};

const getAllGenres = async () => {
  const query = `
    SELECT * FROM genres;
  `;
  const { rows } = await db.query(query);
  return rows;
};

const getAllAuthors = async () => {
  const query = `
    SELECT * FROM authors;
  `;
  const { rows } = await db.query(query);
  return rows;
};

const getAuthorsBooks = async (authorId) => {
  const query = `
    SELECT b.title, b.summary, b.cover_image, b.published_date
    FROM books b
    JOIN book_authors ba ON b.id = ba.book_id
    WHERE ba.author_id = $1;
  `;
  const { rows } = await db.query(query, [authorId]);
  return rows;
};

const getBooksByGenre = async (genreId) => {
  const query = `
    SELECT b.id, b.title, b.summary, b.cover_image, b.published_date, a.name AS author_name, g.name AS genre_name
    FROM books b 
    JOIN book_genres bg ON b.id = bg.book_id
    JOIN genres g ON bg.genre_id = g.id 
    JOIN book_authors ba ON b.id = ba.book_id
    JOIN authors a ON ba.author_id = a.id
    WHERE g.id = $1;
  `;
  const { rows } = await db.query(query, [genreId]);
  return rows;
};

const getBooksCount = async () => {
  const query = `
    SELECT COUNT(*) AS book_count FROM books;
  `;
  const { rows } = await db.query(query);
  return rows[0].book_count;
};

/* END OF RETRIEVE QUERIES */

// TODO: Implement create, update, delete queries

/* CREATE QUERIES */

/* END OF CREATE QUERIES */

/* UPDATE QUERIES */

/* END OF UPDATE QUERIES */

/* DELETE QUERIES */

/* END OF DELETE QUERIES */

module.exports = {
  // Retrieve queries
  getFinishedReadingsBooks,
  getReadingBooks,
  getToReadBooks,
  getAllBooks,
  getAllGenres,
  getAllAuthors,
  getAuthorsBooks,
  getBooksByGenre,
  getBooksCount,
  getBookById,
  // Create queries
  // Update queries
  // Delete queries
};
