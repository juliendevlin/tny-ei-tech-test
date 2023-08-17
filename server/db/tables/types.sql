DROP TABLE IF EXISTS types;

CREATE TABLE types (
  id   INTEGER,
  type TEXT     NOT NULL,
  PRIMARY KEY(id)
);

INSERT INTO types (type)
VALUES ('fiction'), ('nonfiction');
