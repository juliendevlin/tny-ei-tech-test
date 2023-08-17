DROP TABLE IF EXISTS books;

CREATE TABLE books (
  id           INTEGER,
  title        TEXT    NOT NULL,
  author_id    INTEGER NOT NULL,
  isbn         TEXT    NOT NULL,
  pages        INTEGER NOT NULL,
  publisher_id INTEGER NOT NULL,
  year         INTEGER NOT NULL,
  format_id    INT     NOT NULL,
  type_id     INT     NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(author_id) REFERENCES authors(id),
  FOREIGN KEY(publisher_id) REFERENCES publishers(id),
  FOREIGN KEY(format_id) REFERENCES formats(id),
  FOREIGN KEY(type_id) REFERENCES types(id)
);

-- The Broom of the System
INSERT INTO books (title, author_id, isbn, pages, publisher_id, year, format_id, type_id)
VALUES ('The Broom of the System', 1, '0670812307', 467, 1, 1987, 1, 1);

-- Infinite Jest (2006)
INSERT INTO books (title, author_id, isbn, pages, publisher_id, year, format_id, type_id)
VALUES ('Infinite Jest', 1, '0274994747', 1079, 2, 2006, 2, 1);

-- Infinite Jest (1997)
INSERT INTO books (title, author_id, isbn, pages, publisher_id, year, format_id, type_id)
VALUES ('Infinite Jest', 1, '0349121087', 1104, 3, 1997, 2, 1);

-- Oblivion
INSERT INTO books (title, author_id, isbn, pages, publisher_id, year, format_id, type_id)
VALUES ('Oblivion', 1, '0316919810', 1329, 4, 2004, 2, 1);

-- A Supposedly Fun Thing I‘ll Never Do Again: Essays and Arguments
INSERT INTO books (title, author_id, isbn, pages, publisher_id, year, format_id, type_id)
VALUES ('A Supposedly Fun Thing I’ll Never Do Again: Essays and Arguments', 1, '0316925284', 368, 2, 1998, 2, 2);

-- Consider the Lobster and Other Essays
INSERT INTO books (title, author_id, isbn, pages, publisher_id, year, format_id, type_id)
VALUES ('Consider the Lobster and Other Essays', 1, '0316013323', 343, 4, 2007, 2, 2);

-- The Gift
INSERT INTO books (title, author_id, isbn, pages, publisher_id, year, format_id, type_id)
VALUES ('The Gift', 2, '0679727256', 384, 5, 1991, 2, 1);

-- Bend Sinister
INSERT INTO books (title, author_id, isbn, pages, publisher_id, year, format_id, type_id)
VALUES ('Bend Sinister', 2, '0679727272', 272, 5, 1990, 2, 1);

-- Lolita
INSERT INTO books (title, author_id, isbn, pages, publisher_id, year, format_id, type_id)
VALUES ('Lolita', 2, '0679723161', 317, 5, 1989, 2, 1);

-- Speak, Memory: An Autobiography Revisited
INSERT INTO books (title, author_id, isbn, pages, publisher_id, year, format_id, type_id)
VALUES ('Speak, Memory: An Autobiography Revisited', 2, '0679723390', 336, 5, 1989, 2, 2);

-- White Teeth
INSERT INTO books (title, author_id, isbn, pages, publisher_id, year, format_id, type_id)
VALUES ('White Teeth', 3, '0375703861', 464, 5, 2001, 2, 1);

-- On Beauty
INSERT INTO books (title, author_id, isbn, pages, publisher_id, year, format_id, type_id)
VALUES ('On Beauty', 3, '014101945X', 464, 6, 2006, 2, 1);

-- NW
INSERT INTO books (title, author_id, isbn, pages, publisher_id, year, format_id, type_id)
VALUES ('NW', 3, '1594203970', 416, 6, 2012, 1, 1);
