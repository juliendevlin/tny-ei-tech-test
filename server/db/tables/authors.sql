DROP TABLE IF EXISTS authors;

CREATE TABLE authors (
  id            INTEGER,
  author        TEXT     NOT NULL,
  date_of_birth DATE     NOT NULL,
  date_of_death DATE,
  PRIMARY KEY(id)
);

-- David Foster Wallace
INSERT INTO authors (author, date_of_birth, date_of_death)
VALUES ('David Foster Wallace', '1962-02-21', '2008-09-12');

-- Vladimir Nabokov
INSERT INTO authors (author, date_of_birth, date_of_death)
VALUES ('Vladimir Nabokov', '1899-04-22', '1977-07-02');

-- Zadie Smith
INSERT INTO authors (author, date_of_birth)
VALUES ('Zadie Smith', '1975-10-25');
