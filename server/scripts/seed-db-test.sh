#!/bin/bash

SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &> /dev/null && pwd);
DB_RELATIVE_DIR="../db-test";
DB_FILENAME="tny-ei-tech-test.db";
DB_RELATIVE_PATHNAME="${DB_RELATIVE_DIR}/${DB_FILENAME}";
DB_PATHNAME="${SCRIPT_DIR}/${DB_RELATIVE_PATHNAME}";

# Pipe the SQL-containing file into the SQLite database.
cat \
"${SCRIPT_DIR}/${DB_RELATIVE_DIR}/setup.sql" \
| \
sqlite3 $DB_PATHNAME;
# echo $DB_PATHNAME;
