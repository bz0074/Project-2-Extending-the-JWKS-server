//test/keyUtils.test.js 
const { expect } = require('chai');
const { serializeKey, deserializeKey } = require('../keyUtils');

describe('Key Utilities', () => {
  it('should serialize and deserialize an RSA private key', () => {
    const privateKey = '...'; // Provide a valid RSA private key string
    const serializedKey = serializeKey(privateKey);
    const deserializedKey = deserializeKey(serializedKey);

    expect(deserializedKey).to.equal(privateKey);
  });
});

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

//test/authEndpoint.test.js
const { expect } = require('chai');
const request = require('supertest');
const app = require('../authEndpoint');

describe('Auth Endpoint', () => {
  it('should return a JWT for a valid request', (done) => {
    request(app)
      .post('/auth')
      .expect(200)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('should handle expired query parameter', (done) => {
    request(app)
      .post('/auth?expired=true')
      .expect(200)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body).to.have.property('token');
        done();
      });
  });

  // Add more test cases as needed
});
