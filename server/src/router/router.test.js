const request = require('supertest');
const { start_db, stop_db } = require('../db');
const { setupApp } = require('../server');
const { create_router } = require('./');

let app;
let db;

describe('Router Tests', () => {
  beforeAll(async () => {
    app = setupApp();
    db = await start_db();

    const router = create_router(db);
    app.use(router);
  });

  afterAll(async () => {
    stop_db(db);
  });

  it('POST /books', async () => {
    const response = await request(app).post("/books").send({
      title: "New-Book",
      isbn: "New-ISBN",
      pages: 1,
      year: 2023,
      authorId: 1,
      publisherId: 1,
      formatId: 1,
      typeId: 1,
    });

    expect(response.statusCode).toBe(201);

    // verify new entry in the test db
    await db.get('SELECT * FROM books WHERE isbn = ?', 'New-ISBN', (err, rows) => {
      expect(rows.title).toBe('New-Book');
      expect(rows.isbn).toBe('New-ISBN');
      expect(rows.pages).toBe(1);
      expect(rows.year).toBe(2023);
      expect(rows.author_id).toBe(1);
      expect(rows.publisher_id).toBe(1);
      expect(rows.format_id).toBe(1);
      expect(rows.type_id).toBe(1);
    });
  });

  it('GET /books/:isbn', async () => {
    const response = await request(app).get("/books/New-ISBN");

    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe('New-Book')
    expect(response.body.author).toBe('David Foster Wallace');
    expect(response.body.date_of_birth).toBe('1962-02-21');
    expect(response.body.date_of_death).toBe('2008-09-12');
    expect(response.body.isbn).toBe('New-ISBN');
    expect(response.body.pages).toBe(1);
    expect(response.body.publisher).toBe('Viking');
    expect(response.body.city).toBe('New York');
    expect(response.body.year).toBe(2023);
    expect(response.body.format).toBe('harcover');
    expect(response.body.type).toBe('fiction');
  });

  it('GET /books', async () => {
    const response = await request(app).get("/books");

    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();

    // test db is initialized with 1 entry, so there should now be 2 entries
    expect(response.body).toHaveLength(2);
    response.body.forEach(element => {
      expect(element).toHaveProperty('title');
      expect(element).toHaveProperty('author');
      expect(element).toHaveProperty('date_of_birth');
      expect(element).toHaveProperty('date_of_death');
      expect(element).toHaveProperty('isbn');
      expect(element).toHaveProperty('pages');
      expect(element).toHaveProperty('publisher');
      expect(element).toHaveProperty('city');
      expect(element).toHaveProperty('year');
      expect(element).toHaveProperty('format');
      expect(element).toHaveProperty('type');
    });
  });

  it('PUT /books/:isbn', async () => {
    const response = await request(app).put("/books/New-ISBN").send({
      title: "Updated-Book",
      isbn: "New-ISBN",
      pages: 1,
      year: 2023,
      authorId: 1,
      publisherId: 1,
      formatId: 1,
      typeId: 1,
    });

    expect(response.statusCode).toBe(204);

    // verify the title of entry in test db has been updated
    await db.get('SELECT * FROM books WHERE isbn = ?', 'New-ISBN', (err, rows) => {
      expect(rows.title).toBe('Updated-Book');
    });
  });

  it('DELETE /books/:isbn', async () => {
    const response = await request(app).delete("/books/New-ISBN");

    expect(response.statusCode).toBe(204);

    // verify entry in test db has been removed
    await db.get('SELECT * FROM books WHERE isbn = ?', 'New-ISBN', (err, rows) => {
      expect(err).toBeDefined();
    });
  });
});
