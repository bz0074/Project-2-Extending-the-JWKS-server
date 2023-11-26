// jwksEndpoint.js

const express = require('express');
const db = require('./db');
const { deserializeKey } = require('./keyUtils');

const app = express();
const port = 3000;

app.get('/.well-known/jwks.json', (req, res) => {
  // Retrieve all valid (non-expired) keys from the database
  const query = 'SELECT * FROM keys WHERE exp >= ?';
  db.all(query, [Math.floor(Date.now() / 1000)], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const keys = rows.map((row) => ({
      kid: row.kid.toString(),
      kty: 'RSA',
      use: 'sig',
      nbf: Math.floor(Date.now() / 1000),
      exp: row.exp,
      alg: 'RS256',
      n: '...',
      e: '...',
    }));

    res.json({ keys });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
