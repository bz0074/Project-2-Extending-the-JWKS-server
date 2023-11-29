const express = require('express');
const jwtUtils = require('./jwtUtils'); // Import your jwtUtils module here
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Define your routes
app.post('/auth', (req, res) => {
  // Your authentication logic using jwtUtils.authenticate
  // Example: jwtUtils.authenticate(req, res);
  res.status(200).json({ token: 'your_generated_token' });
});

// Serve JWKS endpoint
app.get('/.well-known/jwks.json', (req, res) => {
  // Your JWKS logic
  // Example: res.status(200).json({ keys: [/* your JWKS keys */] });
});

// Start the server

const server = app.listen(4000, () => {
    console.log('Server is running on port 4000');
});


module.exports = server;
