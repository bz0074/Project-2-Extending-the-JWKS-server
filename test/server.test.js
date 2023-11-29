// server.test.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/server'); // Adjust the path accordingly
const expect = chai.expect;

chai.use(chaiHttp);

describe('Server Tests', () => {
  it('should start the server', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  // Add more server tests as needed
});
