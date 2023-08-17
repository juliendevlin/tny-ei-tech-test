DROP TABLE IF EXISTS formats;

CREATE TABLE formats (
  id     INTEGER,
  format TEXT     NOT NULL,
  PRIMARY KEY(id)
);

INSERT INTO formats (format)
VALUES ('harcover'), ('paperback');
