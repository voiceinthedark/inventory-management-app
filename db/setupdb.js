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

async function setupDB(){
  try{
    await client.connect()
    console.log('Connected to the database successfully.')

    const createTableBooks = `
      CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        title TEXT NOT NULL,
        summary TEXT,
        cover_image TEXT,
        published_date DATE,
      );
    `
      const createTableAuthors = `
      CREATE TABLE IF NOT EXISTS authors (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name varchar(255) NOT NULL,
        bio TEXT,
        birthdate DATE,
        nationality varchar(80)
      );
    `

      const createTableBookAuthors = `
      CREATE TABLE IF NOT EXISTS book_authors (
        book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
        author_id INTEGER REFERENCES authors(id) ON DELETE CASCADE,
        PRIMARY KEY (book_id, author_id)
      );
    `

      const createTableGenres = `
      CREATE TABLE IF NOT EXISTS genres (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name varchar(80) NOT NULL UNIQUE,
        description TEXT
      );
    `
      const createTableBookGenres = `
      CREATE TABLE IF NOT EXISTS book_genres (
        book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
        genre_id INTEGER REFERENCES genres(id) ON DELETE CASCADE,
        PRIMARY KEY (book_id, genre_id)
      );
    `
      const createTableFinishedReadings = `
      CREATE TABLE IF NOT EXISTS finished_readings (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
      );
    `
      const createTableReading = `
      CREATE TABLE IF NOT EXISTS reading (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
      );
    `
      const createTableToRead = `
      CREATE TABLE IF NOT EXISTS to_read (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
      );
    `
    await client.query(createTableBooks)
    console.log('Books table created or already exists.')
    await client.query(createTableAuthors)
    console.log('Authors table created or already exists.')
    await client.query(createTableBookAuthors)
    console.log('Book_Authors table created or already exists.')
    await client.query(createTableGenres)
    console.log('Genres table created or already exists.')
    await client.query(createTableBookGenres)
    console.log('Book_Genres table created or already exists.')
    await client.query(createTableFinishedReadings)
    console.log('Finished_Readings table created or already exists.')
    await client.query(createTableReading)
    console.log('Reading table created or already exists.')
    await client.query(createTableToRead)
    console.log('To_Read table created or already exists.')

    await client.end()
    console.log('Database setup completed and connection closed.')
  }
  catch(err){
    console.error('Error connecting to the database:', err)
    process.exit(1)
  }
}

setupDB()
