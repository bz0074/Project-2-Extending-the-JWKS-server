// server.test.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, server } = require('../src/server'); // Adjust the path accordingly

chai.use(chaiHttp);
const expect = chai.expect;

before(async () => {
  // Wait for the server to start before running tests
  await new Promise((resolve) => {
    server.on('listening', resolve);
  });
});

after(() => {
  // Close the server after all tests
  server.close();
});

describe('Server Tests', () => {
  it('should handle a GET request', async () => {
    const res = await chai.request(app).get('/');
    expect(res).to.have.status(404);
  });

  // Add more server tests as needed
});
