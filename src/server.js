const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); // Assuming you have a separate file for database interactions
const jwtUtils = require('./jwtUtils');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Endpoint to handle authentication
app.post('/auth', async (req, res) => {
  try {
    const expired = req.query.expired === 'true';
    const privateKey = await db.getPrivateKey(expired);
    const jwt = jwtUtils.signJWT(privateKey);
    res.json({ token: jwt });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to retrieve JWKS
app.get('/.well-known/jwks.json', async (req, res) => {
  try {
    const privateKeys = await db.getValidPrivateKeys();
    const jwks = jwtUtils.generateJWKS(privateKeys);
    res.json(jwks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
