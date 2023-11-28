const db = require('../src/db');

describe('Database', () => {
  it('should have a keys table', done => {
    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='keys'", (err, row) => {
      expect(err).toBeNull();
      expect(row).toBeDefined();
      done();
    });
  });
});
