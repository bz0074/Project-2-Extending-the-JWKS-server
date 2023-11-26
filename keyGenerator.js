// keyGenerator.js

const { generateKeyPairSync } = require('crypto');
const db = require('./db');
const { serializeKey } = require('./keyUtils');

// Function to generate and store an RSA private key in the database
function generateAndStoreKey(expiryInSeconds) {
  const { privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  });

  const serializedKey = serializeKey(privateKey);

  const exp = Math.floor(Date.now() / 1000) + expiryInSeconds;

  // Store the key in the database
  db.run('INSERT INTO keys (key, exp) VALUES (?, ?)', [serializedKey, exp]);
}

// Generate and store keys with different expiry times
generateAndStoreKey(3600); // 1 hour
generateAndStoreKey(-60);  // expired (1 minute ago)
