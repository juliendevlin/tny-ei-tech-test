const { 
  selectBook,
  selectBooks,
  insertBook,
  updateBook,
  deleteBook,
} = require('../db');

function createBooksController(db) {
  return {
    getBook: async (req, res, next) => {
      const { isbn } = req.params;

      try {
        const book = await selectBook(db, isbn);

        if (book === undefined) {
          return next({
            log: 'Query did not find a match for requested ISBN',
            status: 404,
            message: {err: 'Requested resource does not exist'},
          });
        }
        else {
          res.locals.book = book;
          return next();
        }
      } catch (err) {
        return next({
          log: `Error while querying database - ${err}`,
          status: 400,
          message: {err: 'Failed to retrieve resource'},
        });
      }
    },

    getBooks: async (req, res, next) => {
      try {
        const books = await selectBooks(db);

        res.locals.books = books;
        return next();
      } catch (err) {
        return next({
          log: `Error while querying database - ${err}`,
          status: 400,
          message: {err: 'Failed to retrieve resource'},
        });
      }
    },

    createBook: async (req, res, next) => {
      const {
        title,
        isbn,
        pages,
        year,
        authorId,
        publisherId,
        formatId,
        typeId,
      } = req.body;

      try {
        await insertBook(db, [title, isbn, pages, year, authorId, publisherId, formatId, typeId]);
        return next();
      } catch(err) {
        return next({
          log: `Error while creating book in database - ${err}`,
          status: 400,
          message: {err: 'Failed to create resource'},
        });
      }
    },

    updateBook: async (req, res, next) => {
      const { isbn } = req.params;
      const {
        title,
        isbn: newIsbn,
        pages,
        year,
        authorId,
        publisherId,
        formatId,
        typeId
      } = req.body;

      try {
        await updateBook(db, [title, newIsbn, pages, year, authorId, publisherId, formatId, typeId, isbn]);
        return next();
      } catch(err) {
        return next({
          log: `Error while updating book in database - ${err}`,
          status: 400,
          message: {err: 'Failed to update resource'},
        });
      }
    },

    deleteBook: async (req, res, next) => {
      const { isbn } = req.params;

      try {
        await deleteBook(db, isbn);
        return next();
      } catch(err) {
        return next({
          log: `Error while deleting book in database - ${err}`,
          status: 400,
          message: {err: 'Failed to destroy resource'},
        });
      }
    },
  };
}

module.exports = createBooksController;
