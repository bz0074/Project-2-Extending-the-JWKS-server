// authEndpoint.js

const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('./db');
const { deserializeKey } = require('./keyUtils');

const app = express();
const port = 3000;

app.post('/auth', (req, res) => {
  const expired = req.query.expired === 'true';

  // Retrieve a valid (unexpired) or expired key from the database
  const query = expired ? 'SELECT * FROM keys WHERE exp < ?' : 'SELECT * FROM keys WHERE exp >= ?';
  db.get(query, [Math.floor(Date.now() / 1000)], (err, row) => {
    if (err || !row) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const privateKey = deserializeKey(row.key);

    // Sign a JWT with the selected private key
    const token = jwt.sign({ sub: 'userABC' }, privateKey, { algorithm: 'RS256' });

    res.json({ token });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
