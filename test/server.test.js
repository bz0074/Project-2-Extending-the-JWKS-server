const request = require('supertest');
const app = require('../src/server');

let server;

afterAll((done) => {
  // Close the server after all tests are done
  server.close(done);
});

describe('POST /auth', () => {
  it('should return a valid JWT', (done) => {
    server = app.listen(3000, () => {
      // Your test logic here
      request(app)
        .post('/auth')
        .send(/* your request body */)
        .expect(200)
        .end((err, res) => {
          // Handle the response
          done();
        });
    });
  });
});

describe('GET /.well-known/jwks.json', () => {
  it('should return a valid JWKS', async () => {
    // Your test logic here
    const response = await request(app).get('/.well-known/jwks.json');
    expect(response.status).toBe(200);
    expect(response.body.keys).toBeDefined();
  }, 15000); // Set timeout to 15 seconds
});
