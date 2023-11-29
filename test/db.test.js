const db = require('./db');
const sqlite3 = require('sqlite3').verbose();

beforeAll(() => {
  // Create an in-memory database for testing
  db = new sqlite3.Database(':memory:');
});

test('Database creation', (done) => {
  db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS keys(kid INTEGER PRIMARY KEY AUTOINCREMENT, key BLOB NOT NULL, exp INTEGER NOT NULL)');

    db.all('SELECT name FROM sqlite_master WHERE type="table" AND name="keys"', (err, rows) => {
      expect(err).toBeNull();
      expect(rows.length).toBe(1);
      done();
    });
  });
});

// Add more tests as needed
