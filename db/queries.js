const db = require('./pool')

async function getFinishedReadingsBooks() {
  const query = `
    SELECT b.title, b.summary, b.cover_image, b.published_date, a.name AS author_name
    FROM books b
    JOIN finished_readings fr ON b.id = fr.book_id
    JOIN book_authors ba ON b.id = ba.book_id
    JOIN authors a ON ba.author_id = a.id;
  `
  const { rows } = await db.query(query)
  return rows
}

const getReadingBooks = async () => {
  const query = `
    SELECT b.title, b.summary, b.cover_image, b.published_date, a.name AS author_name
    FROM books b
    JOIN reading r ON b.id = r.book_id
    JOIN book_authors ba ON b.id = ba.book_id
    JOIN authors a ON ba.author_id = a.id;
  `
  const { rows } = await db.query(query)
  return rows
}

const getToReadBooks = async () => {
  const query = `
    SELECT b.title, b.summary, b.cover_image, b.published_date, a.name AS author_name
    FROM books b
    JOIN to_read tr ON b.id = tr.book_id
    JOIN book_authors ba ON b.id = ba.book_id
    JOIN authors a ON ba.author_id = a.id;
  `
  const { rows } = await db.query(query)
  return rows
}

module.exports = { getFinishedReadingsBooks, getReadingBooks, getToReadBooks }
