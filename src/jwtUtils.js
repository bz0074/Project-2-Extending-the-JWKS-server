const jwt = require('jsonwebtoken');
const db = require('./db');

// Function to authenticate and generate JWT
const authenticate = (req, res) => {
  // Your authentication logic here

  // Fetch key from the database based on the query parameter
  const expired = req.query.expired === 'true';
  const keyQuery = expired ? 'SELECT * FROM keys WHERE exp < strftime("%s", "now")' : 'SELECT * FROM keys WHERE exp >= strftime("%s", "now")';
  
  db.get(keyQuery, (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (!row) {
      return res.status(404).json({ error: 'No valid key found' });
    }

    // Your JWT signing logic here
    const token = jwt.sign({/* Payload */}, row.key, { algorithm: 'RS256', keyid: row.kid.toString() });

    res.json({ token });
  });
};

// Function to get JWKS
const getJWKS = (req, res) => {
  // Fetch all valid keys from the database
  const keyQuery = 'SELECT * FROM keys WHERE exp >= strftime("%s", "now")';

  db.all(keyQuery, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: 'No valid keys found' });
    }

    // Convert keys to JWKS format
    const jwks = rows.map(row => ({
      kid: row.kid.toString(),
      kty: 'RSA',
      n: 'base64url-encoded-modulus',
      e: 'base64url-encoded-exponent',
    }));

    res.json({ keys: jwks });
  });
};

module.exports = { authenticate, getJWKS };
