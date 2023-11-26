//test/keyGenerator.test.js
const { expect } = require('chai');
const { generateAndStoreKey } = require('../keyGenerator');
const db = require('../db');

describe('Key Generator', () => {
  it('should generate and store RSA private keys in the database', () => {
    generateAndStoreKey(3600); // Generate a key that expires in 1 hour

    // Query the database for the generated key
    db.get('SELECT * FROM keys WHERE exp >= ?', [Math.floor(Date.now() / 1000)], (err, row) => {
      expect(err).to.be.null;
      expect(row).to.exist;
      expect(row.exp).to.be.above(Math.floor(Date.now() / 1000));
    });
  });
});
"scripts": {
  "test": "jest",
  "coverage": "jest --coverage"
}
