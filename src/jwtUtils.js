const fs = require('fs');
const jwt = require('jsonwebtoken');
const db = require('./db');

// Load private keys from the database
const loadPrivateKeys = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT key, exp FROM keys WHERE exp > ?', Date.now(), (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Middleware for authenticating the user and issuing a JWT
const authenticateUser = async (req, res) => {
  try {
    const expired = req.query.expired === 'true';
    const privateKeys = await loadPrivateKeys();

    // Filter out expired keys if 'expired' query parameter is not present
    const validKeys = expired ? privateKeys : privateKeys.filter(key => key.exp > Date.now());

    if (validKeys.length === 0) {
      return res.status(500).json({ error: 'No valid private keys available' });
    }

    // Select a random key from the valid keys
    const selectedKey = validKeys[Math.floor(Math.random() * validKeys.length)];

    // Sign a JWT using the selected private key
    const token = jwt.sign({ username: 'userABC' }, selectedKey.key, { algorithm: 'RS256', keyid: selectedKey.kid });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Endpoint for retrieving JWKS (JSON Web Key Set)
const getJWKS = async (req, res) => {
  try {
    const privateKeys = await loadPrivateKeys();

    // JWKS format
    const jwks = privateKeys.map(key => ({
      kid: key.kid.toString(),
      kty: 'RSA',
      use: 'sig',
      nbf: key.exp,
      e: 'AQAB',
      n: key.key.toString('base64'),
    }));

    res.json({ keys: jwks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  authenticateUser,
  getJWKS,
};
