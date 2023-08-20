const express = require('express');
const { getBooks, getBook } = require('../db');
const router = express.Router();

function create_router(db) {
  router.get('/books/:isbn', async (req, res, next) => {
    const { isbn } = req.params;

    try {
      const book = await getBook(db, isbn);

      if (book === undefined) {
        return next({
          log: 'Query did not find a match for requested ISBN',
          status: 404,
          message: {err: 'Requested resource does not exist'},
        });
      }
      else {
        return res.json(book);
      }
    } catch (err) {
      return next({
        log: `Error while querying database - ${err}`,
        status: 400,
        message: {err: 'Failed to retrieve resource'},
      });
    }
  });

  router.get('/books', async (req, res) => {
    try {
      const books = await getBooks(db);
      res.json(books);
    } catch (err) {
      return next({
        log: `Error while querying database - ${err}`,
        status: 400,
        message: {err: 'Failed to retrieve resource'},
      });
    }
  });

  return router;
}

module.exports = {
  create_router
};
