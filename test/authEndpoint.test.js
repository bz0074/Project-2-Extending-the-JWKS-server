//test/authEndpoint.test.js
const { expect } = require('chai');
const request = require('supertest');
const app = require('../authEndpoint');

describe('Auth Endpoint', () => {
  it('should return a JWT for a valid request', (done) => {
    request(app)
      .post('/auth')
      .expect(200)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('should handle expired query parameter', (done) => {
    request(app)
      .post('/auth?expired=true')
      .expect(200)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body).to.have.property('token');
        done();
      });
  });

});
