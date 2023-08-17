const path = require('node:path');
const sqlite3 = require('sqlite3').verbose();

const DB_LOCATION = 'db/data/tny-ei-tech-test.db';

async function start_db() {
  const filename = path.resolve('.', DB_LOCATION);
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(filename,
      sqlite3.OPEN_READWRITE,
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(db);
        }
      }
    );
  });
}

async function stop_db(db) {
  return new Promise((resolve) => {
    db.close(() => resolve());
  });
}

// Query for title, author, year, format of all books in database
async function getBooks(db) {
  const sql = `
  SELECT books.title, authors.author, books.year, formats.format FROM books
  INNER JOIN authors ON authors.id = books.author_id
  INNER JOIN formats ON formats.id = books.format_id
  `;

  return new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    })
  });
}

// Query for title, author, publisher, city, format, year, isbn of single book by isbn
async function getBook(db, isbn) {
  const sql = `
    SELECT 
      books.title,
      authors.author,
      publishers.publisher,
      cities.city,
      formats.format,
      books.year,
      books.isbn
    FROM books

    INNER JOIN authors ON authors.id = books.author_id
    INNER JOIN formats ON formats.id = books.format_id
    INNER JOIN publishers ON publishers.id = books.publisher_id
    INNER JOIN cities ON cities.id = publishers.city_id

    WHERE books.isbn = ?
  `;

  return new Promise((resolve, reject) => {
    db.get(sql, isbn, (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    })
  });
}

module.exports = {
  start_db,
  stop_db,
  getBooks,
  getBook,
}
