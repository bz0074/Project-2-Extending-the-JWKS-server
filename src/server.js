const express = require('express');
const bodyParser = require('body-parser');
const { authenticate, getJWKS } = require('./jwtUtils');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Authentication endpoint
app.post('/auth', authenticate);

// JWKS endpoint
app.get('/.well-known/jwks.json', getJWKS);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
