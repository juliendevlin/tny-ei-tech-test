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

  router.post('/books', booksController.createBook, async (req, res, next) => {
    return res.sendStatus(201);
  });

  router.put('/books/:isbn', booksController.updateBook, async (req, res, next) => {
    return res.sendStatus(204);
  });

  router.delete('/books/:isbn', booksController.deleteBook, async (req, res, next) => {
    return res.sendStatus(204);
  });

  return router;
}

module.exports = {
  create_router
};
