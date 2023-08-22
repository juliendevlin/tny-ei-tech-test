const createBooksController = require('../controller');

// Mock req, res, next to be passed to controller methods
const req = {
  params: {},
  body: {},
};
const res = {
  locals: {},
};
const next = jest.fn();

describe('bookController', () => {
  beforeEach(() => {
    req.params = {};
    res.locals = {};
    next.mockClear();
  });

  describe('getBook',  () => {
    it('Should store the result of a successful query in res.locals.book and invoke next with no argument', async () => {
      const db = {
        get: (sql, param, cb) => {
          if (param === 'valid-isbn') return cb(null, 'success!');
        },
      };
      const { getBook } = createBooksController(db);
      req.params.isbn = 'valid-isbn';
      
      await getBook(req, res, next);
      
      expect(res.locals.book).toBe('success!');
      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0]).toHaveLength(0);
    });

    it('Should throw to global error handler by invoking next with error argument if the query does not return a result', async () => {
      const db = {
        get: (sql, param, cb) => {
          if (param === 'invalid-isbn') return cb(null, undefined);
        },
      };
      const { getBook } = createBooksController(db);
      req.params.isbn = 'invalid-isbn';

      await getBook(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0]).toHaveLength(1);
    });

    it('Should throw to global error handler by invoking next with error argument if an error is caught while performing the query', async () => {
      const db = {
        get: (sql, param, cb) => cb('error!'),
      };
      const { getBook } = createBooksController(db);
      req.params.isbn = 'bad-query';

      await getBook(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0]).toHaveLength(1);
    });
  });

  describe('getBooks', () => {
    it('Should store the result of a successful query in res.locals.books and invoke next with no argument', async () => {
      const db = {
        all: (sql, cb) => cb(null, 'success!'),
      };
      const { getBooks } = createBooksController(db);

      await getBooks(req, res, next);
      
      expect(res.locals.books).toBe('success!');
      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0]).toHaveLength(0);
    });

    it('Should throw to global error handler by invoking next with error argument if an error is caught while performing the query', async () => {
      const db = {
        all: (sql, cb) => cb('error!'),
      };
      const { getBooks } = createBooksController(db);

      await getBooks(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0]).toHaveLength(1);
    });
  });

  describe('createBook', () => {
    it('Should invoke next with no argument after a successful query', async () => {
      const db = {
        run: (sql, param, cb) => cb(null, 'success!'),
      };
      const { createBook } = createBooksController(db);

      await createBook(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0]).toHaveLength(0);
    });

    it('Should throw to global error handler by invoking next with error argument if an error is caught while performing the query', async () => {
      const db = {
        all: (sql, params, cb) => cb('error!'),
      };
      const { createBook } = createBooksController(db);

      await createBook(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0]).toHaveLength(1);
    });
  });

  describe('updateBook', () => {
    it('Should invoke next with no argument after a successful query', async () => {
      const db = {
        run: (sql, param, cb) => cb(null, 'success!'),
      };
      const { updateBook } = createBooksController(db);

      await updateBook(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0]).toHaveLength(0);
    });

    it('Should throw to global error handler by invoking next with error argument if an error is caught while performing the query', async () => {
      const db = {
        all: (sql, params, cb) => cb('error!'),
      };
      const { updateBook } = createBooksController(db);

      await updateBook(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0]).toHaveLength(1);
    });
  });

  describe('deleteBook', () => {
    it('Should invoke next with no argument after a successful query', async () => {
      const db = {
        run: (sql, param, cb) => cb(null, 'success!'),
      };
      const { deleteBook } = createBooksController(db);

      await deleteBook(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0]).toHaveLength(0);
    });

    it('Should throw to global error handler by invoking next with error argument if an error is caught while performing the query', async () => {
      const db = {
        all: (sql, params, cb) => cb('error!'),
      };
      const { deleteBook } = createBooksController(db);

      await deleteBook(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0]).toHaveLength(1);
    });
  });
});
