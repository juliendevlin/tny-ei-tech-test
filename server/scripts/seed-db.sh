#!/bin/bash

SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &> /dev/null && pwd);
DB_RELATIVE_DIR="../db";
DB_FILENAME="tny-ei-tech-test.db";
DB_RELATIVE_PATHNAME="${DB_RELATIVE_DIR}/data/${DB_FILENAME}";
DB_PATHNAME="${SCRIPT_DIR}/${DB_RELATIVE_PATHNAME}";

# Pipe the SQL-containing files into the SQLite database.
cat \
"${SCRIPT_DIR}/${DB_RELATIVE_DIR}/tables/authors.sql" \
"${SCRIPT_DIR}/${DB_RELATIVE_DIR}/tables/cities.sql" \
"${SCRIPT_DIR}/${DB_RELATIVE_DIR}/tables/formats.sql" \
"${SCRIPT_DIR}/${DB_RELATIVE_DIR}/tables/types.sql" \
"${SCRIPT_DIR}/${DB_RELATIVE_DIR}/tables/publishers.sql" \
"${SCRIPT_DIR}/${DB_RELATIVE_DIR}/tables/books.sql" \
| \
sqlite3 $DB_PATHNAME;
# echo $DB_PATHNAME;
