const createBooksController = require('../controller');

const req = {
  params: {},
  body: {},
}
const res = {
  locals: {},
}
const next = jest.fn();

describe('bookController', () => {
  beforeEach(() => {
    req.params = {};
    res.locals = {};
    next.mockClear();
  });

  describe('getBook',  () => {
    const db = {
      get: (sql, param, cb) => {
        if (param === 'valid-isbn') {
          return cb(null, 'success!');
        }
        else if (param === 'invalid-isbn') {
          return cb(null, undefined);
        }
        else return cb('error!')
      },
    }

    const { getBook } = createBooksController(db);

    it('Should store the result of a successful query in res.locals.book and invoke next with no argument', async () => {
      req.params.isbn = 'valid-isbn';
      
      await getBook(req, res, next);
      
      expect(res.locals.book).toBe('success!');
      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0]).toHaveLength(0);
    });

    it('Should throw to global error handler by invoking next with error argument if the query does not return a result', async () => {
      req.params.isbn = 'invalid-isbn';

      await getBook(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0]).toHaveLength(1);
    });

    it('Should throw to global error handler by invoking next with error argument if an error is caught while performing the query', async () => {
      req.params.isbn = 'bad-query';

      await getBook(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0]).toHaveLength(1);
    });
  });

  describe('getBooks', () => {
    it('Should store the result of a successful query in res.locals.books and invoke next with no argument', async () => {
      const db = {
        all: (sql, cb) => {
          return cb(null, 'success!');
        },
      }

      const { getBooks } = createBooksController(db);
      await getBooks(req, res, next);
      
      expect(res.locals.books).toBe('success!');
      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0]).toHaveLength(0);
    });

    it('Should throw to global error handler by invoking next with error argument if an error is caught while performing the query', async () => {
      const db = {
        all: (sql, cb) => {
          return cb('error!');
        },
      }
      
      const { getBooks } = createBooksController(db);
      await getBooks(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0]).toHaveLength(1);
    });
  });

  describe('createBook', () => {
    it('Should invoke next with no argument after a successful query', async () => {
      const db = {
        run: (sql, param, cb) => {
          return cb(null, 'success!');
        },
      }

      const { createBook } = createBooksController(db);
      await createBook(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0]).toHaveLength(0);
    });

    it('Should throw to global error handler by invoking next with error argument if an error is caught while performing the query', async () => {
      const db = {
        all: (sql, params, cb) => {
          return cb('error!');
        },
      }
      
      const { createBook } = createBooksController(db);
      await createBook(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0]).toHaveLength(1);
    });
  });

  describe('updateBook', () => {
    it('Should invoke next with no argument after a successful query', async () => {
      const db = {
        run: (sql, param, cb) => {
          return cb(null, 'success!');
        },
      }

      const { updateBook } = createBooksController(db);
      await updateBook(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0]).toHaveLength(0);
    });

    it('Should throw to global error handler by invoking next with error argument if an error is caught while performing the query', async () => {
      const db = {
        all: (sql, params, cb) => {
          return cb('error!');
        },
      }
      
      const { updateBook } = createBooksController(db);
      await updateBook(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0]).toHaveLength(1);
    });
  });

  describe('deleteBook', () => {
    it('Should invoke next with no argument after a successful query', async () => {
      const db = {
        run: (sql, param, cb) => {
          return cb(null, 'success!');
        },
      }

      const { deleteBook } = createBooksController(db);
      await deleteBook(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0]).toHaveLength(0);
    });

    it('Should throw to global error handler by invoking next with error argument if an error is caught while performing the query', async () => {
      const db = {
        all: (sql, params, cb) => {
          return cb('error!');
        },
      }
      
      const { deleteBook } = createBooksController(db);
      await deleteBook(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0]).toHaveLength(1);
    });
  });
});