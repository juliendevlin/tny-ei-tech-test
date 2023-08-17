DROP TABLE IF EXISTS publishers;

CREATE TABLE publishers (
  id        INTEGER,
  publisher TEXT     NOT NULL,
  city_id   INTEGER  NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY (city_id) REFERENCES cities(id)
);

INSERT INTO publishers (publisher, city_id)
VALUES ('Viking', 1), ('Back Bay Books', 2), ('Abacus', 1), ('Little, Brown and Company', 1), ('Vintage', 1), ('Penguin', 3);
