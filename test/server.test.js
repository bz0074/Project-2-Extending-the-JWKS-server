// server.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, server } = require('../src/server'); // Adjust the path accordingly
const sqlite3 = require('sqlite3');

chai.use(chaiHttp);
const expect = chai.expect;

beforeAll(async () => {
  // Wait for the server to start before running tests
  await new Promise((resolve) => {
    server.on('listening', resolve);
  });
});

describe('Server Tests', () => {
  it('should respond with 404 on unknown routes', (done) => {
    chai.request(app)
      .get('/unknown-route')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});

afterAll(() => {
  // Close the server after all tests
  server.close();
});
