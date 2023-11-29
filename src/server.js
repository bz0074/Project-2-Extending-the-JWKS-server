// server.js

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); // Adjust the path accordingly
const jwtUtils = require('./jwtUtils'); // Adjust the path accordingly

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Example of opening the SQLite DB when the server starts
db.serialize(() => {
  // Create the keys table if not exists
  db.run(`
    CREATE TABLE IF NOT EXISTS keys(
      kid INTEGER PRIMARY KEY AUTOINCREMENT,
      key BLOB NOT NULL,
      exp INTEGER NOT NULL
    )
  `);

  console.log('Database setup complete');
});

// POST:/auth Endpoint
app.post('/auth', (req, res) => {
  const { expired } = req.query;

  // Retrieve private key from the database based on the 'expired' parameter
  const privateKey = getPrivateKeyFromDB(expired);

  if (!privateKey) {
    return res.status(404).json({ error: 'Private key not found' });
  }

  // Sign JWT using the retrieved private key
  const token = signJwt(privateKey);

  // Return the JWT
  res.json({ token });
});

// GET:/.well-known/jwks.json Endpoint
app.get('/.well-known/jwks.json', (req, res) => {
  // Retrieve all valid private keys from the database
  const validKeys = getValidKeysFromDB();

  // Create JWKS response
  const jwks = createJwksResponse(validKeys);

  // Return the JWKS response
  res.json(jwks);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



// Helper functions
function getPrivateKeyFromDB(expired) {
  // Implement logic to retrieve a private key from the database based on the 'expired' parameter
  if (expired === 'true') {
    return db.get('SELECT * FROM keys WHERE exp < ?', [Date.now()]);
  } else {
    return db.get('SELECT * FROM keys WHERE exp >= ?', [Date.now()]);
  }
}

function signJwt(privateKey) {
  // Implement logic to sign a JWT using the private key
  if (!privateKey) {
    return null;
  }

  const key = jwtUtils.deserializeKey(privateKey.key);
  const token = jwtUtils.signToken(key);

  return token;
}

function getValidKeysFromDB() {
  // Implement logic to retrieve all valid private keys from the database
  return db.all('SELECT * FROM keys WHERE exp >= ?', [Date.now()]);
}

function createJwksResponse(validKeys) {
  // Implement logic to create a JWKS response from the valid private keys
  return { keys: validKeys.map((key) => ({ kid: key.kid.toString(), kty: 'RSA', n: jwtUtils.serializeKey(key.key) })) };
}


