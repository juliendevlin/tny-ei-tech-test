const express = require('express');
const { getBooks, getBook } = require('../db');
const router = express.Router();

function create_router(db) {
  router.get('/books/:isbn', async (req, res) => {
    const { isbn } = req.params;
    const books = await getBook(db, isbn);
    res.json(books);
  });

  router.get('/books', async (req, res) => {
    const books = await getBooks(db);
    res.json(books);
  });
  
  router.get('/', (req, res) => {
    res.send('hello, world');
  });

  return router;
}

module.exports = {
  create_router
};
