const sqlite3 = require('sqlite3').verbose();

// Open SQLite database connection
const db = new sqlite3.Database('totally_not_my_privateKeys.db');

// Create keys table if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS keys(
    kid INTEGER PRIMARY KEY AUTOINCREMENT,
    key BLOB NOT NULL,
    exp INTEGER NOT NULL
  )
`);

// Export the database connection
module.exports = db;
