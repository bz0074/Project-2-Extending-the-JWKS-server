// db.js

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('totally_not_my_privateKeys.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS keys (
      kid INTEGER PRIMARY KEY AUTOINCREMENT,
      key BLOB NOT NULL,
      exp INTEGER NOT NULL
    )
  `);
});

db.close();

// You may want to export the database object for reuse in other modules
module.exports = db;
