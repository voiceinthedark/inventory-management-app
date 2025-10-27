#! /usr/bin/env node

const { Client } = require('pg')
require('dotenv').config()

const client = new Client({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
})

async function populateDB() {
  try {
    await client.connect()
    console.log('Connected to the database successfully.')

    const insertAuthors = `
      INSERT INTO authors (name, bio, birthdate, nationality) VALUES 
      ('J.K. Rowling', 'British author, best known for the Harry Potter series.', '1965-07-31', 'British'),
      ('George R.R. Martin', 'American novelist and short story writer, known for A Song of Ice and Fire.', '1948-09-20', 'American'),
      ('J.R.R. Tolkien', 'English writer, poet, philologist, and academic, author of The Lord of the Rings.', '1892-01-03', 'British'),
      ('Brandon Sanderson', 'American author of epic fantasy and science fiction.', '1975-12-19', 'American');
    `

    const insertGenres = `
      INSERT INTO genres (name, description) VALUES 
      ('Fantasy', 'A genre of speculative fiction set in a fictional universe, often inspired by real world myth and folklore.'),
      ('Science Fiction ', 'A genre of speculative fiction that typically deals with imaginative and futuristic concepts.'),
      ('Mystery', 'A genre of fiction that deals with the solution of a crime or the unraveling of secrets.'),
      ('Romance', 'A genre that focuses on the relationship and romantic love between two people.');
    `

    const insertBooks = `
      INSERT INTO books (title, summary, cover_image, published_date) VALUES 
      ('Harry Potter and the Philosopher''s Stone', 'The first book in the Harry Potter series.', 'https://example.com/hp1.jpg', '1997-06-26'),
      ('A Game of Thrones', 'The first book in A Song of Ice and Fire series.', 'https://example.com/got1.jpg', '1996-08-06'),
      ('The Hobbit', 'A fantasy novel and children''s book by J.R.R. Tolkien.', 'https://example.com/hobbit.jpg', '1937-09-21'),
      ('Mistborn: The Final Empire', 'The first book in the Mistborn series by Brandon Sanderson.', 'https://example.com/mistborn1.jpg', '2006-07-17'),
      ('The Way of Kings', 'The first book in The Stormlight Archive series by Brandon Sanderson.', 'https://example.com/wayofkings.jpg', '2010-08-31');
    `

    await client.query(insertAuthors)
    await client.query(insertGenres)
    await client.query(insertBooks)

    // insert relations 
    const insertBookAuthors = `
      INSERT INTO book_authors (book_id, author_id) VALUES 
      (1, 1),
      (2, 2),
      (3, 3),
      (4, 4),
      (5, 4);
    `

    const insertBookGenres = `
      INSERT INTO book_genres (book_id, genre_id) VALUES 
      (1, 1),
      (2, 1),
      (3, 1),
      (4, 1),
      (5, 1);
    `
    const insertFinishedBooks = `
      INSERT INTO finished_readings (book_id) VALUES 
      (2),
      (4),
      (5);
    `
    await client.query(insertFinishedBooks)
    await client.query(insertBookAuthors)
    await client.query(insertBookGenres)

    console.log('Database populated with sample data successfully.')
    await client.end()

  } catch (err) {
    console.error('Error populating database:', err)
  }
}

populateDB()
