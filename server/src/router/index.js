const express = require('express');
const router = express.Router();
const createBooksController = require('../controller');

function create_router(db) {
  const booksController = createBooksController(db);

  router.get('/books/:isbn', booksController.getBook, async (req, res, next) => {
    const { book } = res.locals;
    return res.json(book);
  });

  router.get('/books', booksController.getBooks, async (req, res, next) => {
    const { books } = res.locals;
    return res.json(books);
  });

  return router;
}

module.exports = {
  create_router
};
