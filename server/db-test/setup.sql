DROP TABLE IF EXISTS authors;
DROP TABLE IF EXISTS cities;
DROP TABLE IF EXISTS publishers;
DROP TABLE IF EXISTS formats;
DROP TABLE IF EXISTS types;
DROP TABLE IF EXISTS books;

CREATE TABLE authors (
  id            INTEGER,
  author        TEXT     NOT NULL,
  date_of_birth DATE     NOT NULL,
  date_of_death DATE,
  PRIMARY KEY(id)
);

CREATE TABLE cities (
  id   INTEGER,
  city TEXT     NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE publishers (
  id        INTEGER,
  publisher TEXT     NOT NULL,
  city_id   INTEGER  NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY (city_id) REFERENCES cities(id)
);

CREATE TABLE formats (
  id     INTEGER,
  format TEXT     NOT NULL UNIQUE,
  PRIMARY KEY(id)
);

CREATE TABLE types (
  id   INTEGER,
  type TEXT     NOT NULL UNIQUE,
  PRIMARY KEY(id)
);

CREATE TABLE books (
  id           INTEGER,
  title        TEXT    NOT NULL,
  author_id    INTEGER NOT NULL,
  isbn         TEXT    NOT NULL UNIQUE,
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

INSERT INTO types (type)
VALUES ('fiction'), ('nonfiction');

INSERT INTO formats (format)
VALUES ('harcover'), ('paperback');

INSERT INTO cities (city)
VALUES ('New York');

INSERT INTO publishers (publisher, city_id)
VALUES ('Viking', 1);

INSERT INTO authors (author, date_of_birth, date_of_death)
VALUES ('David Foster Wallace', '1962-02-21', '2008-09-12');

INSERT INTO books (title, author_id, isbn, pages, publisher_id, year, format_id, type_id)
VALUES ('The Broom of the System', 1, '0670812307', 467, 1, 1987, 1, 1);
