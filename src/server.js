// server.js
const express = require('express');
const app = express();
const PORT = 3000;

// Configure your routes and middleware

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, server };
