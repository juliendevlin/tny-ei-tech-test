DROP TABLE IF EXISTS cities;

CREATE TABLE cities (
  id   INTEGER,
  city TEXT     NOT NULL,
  PRIMARY KEY(id)
);

INSERT INTO cities (city)
VALUES ('New York'), ('Boston'), ('London');
