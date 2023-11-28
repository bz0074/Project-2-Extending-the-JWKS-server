const request = require('supertest');
const app = require('../src/server');

afterEach((done) => {
  // Clean up tasks, e.g., close the server
  done();
});

describe('POST /auth', () => {
  it('should return a valid JWT', (done) => {
    // Your test logic here
    const server = app.listen(3000, () => {
      request(app)
        .post('/auth')
        .send(/* your request body */)
        .expect(200)
        .end((err, res) => {
          // Handle the response
          server.close();
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
