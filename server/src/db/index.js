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

// Query for all data for all books in database
async function selectBooks(db) {
  const sql = `
  SELECT 
    books.title,
    authors.author,
    authors.date_of_birth,
    authors.date_of_death,
    books.isbn,
    books.pages,
    publishers.publisher,
    cities.city,
    books.year,
    formats.format,
    types.type
  FROM books

  INNER JOIN authors ON authors.id = books.author_id
  INNER JOIN formats ON formats.id = books.format_id
  INNER JOIN publishers ON publishers.id = books.publisher_id
  INNER JOIN cities ON cities.id = publishers.city_id
  INNER JOIN types ON types.id = books.type_id
  `;

  return new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

// Query for all data for single book by isbn
async function selectBook(db, isbn) {
  const sql = `
    SELECT 
      books.title,
      authors.author,
      authors.date_of_birth,
      authors.date_of_death,
      books.isbn,
      books.pages,
      publishers.publisher,
      cities.city,
      books.year,
      formats.format,
      types.type
    FROM books

    INNER JOIN authors ON authors.id = books.author_id
    INNER JOIN formats ON formats.id = books.format_id
    INNER JOIN publishers ON publishers.id = books.publisher_id
    INNER JOIN cities ON cities.id = publishers.city_id
    INNER JOIN types ON types.id = books.type_id

    WHERE books.isbn = ?
  `;

  return new Promise((resolve, reject) => {
    db.get(sql, isbn, (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

// Insert a new book into books table
async function insertBook(db, book) {
  const sql = `
    INSERT INTO books (title, isbn, pages, year, author_id, publisher_id, format_id, type_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
  `;

  return new Promise((resolve, reject) => {
    db.run(sql, book, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

// Update a book from books table
async function updateBook(db, book) {
  const sql = `
    UPDATE books
    SET
      title = ?,
      isbn = ?,
      pages = ?,
      year = ?,
      author_id = ?,
      publisher_id = ?,
      format_id = ?,
      type_id = ?
    WHERE isbn = ?;
  `;

  return new Promise((resolve, reject) => {
    db.run(sql, book, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

// Delete a book from books table
async function deleteBook(db, isbn) {
  const sql = `
    DELETE FROM books 
    WHERE isbn = ?;
  `;

  return new Promise((resolve, reject) => {
    db.run(sql, isbn, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

module.exports = {
  start_db,
  stop_db,
  selectBooks,
  selectBook,
  insertBook,
  updateBook,
  deleteBook,
};
