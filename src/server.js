// server.js
const express = require('express');
const app = express();
const PORT = 3000;

// Add your routes and middleware here

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, server };
