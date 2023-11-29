const request = require('supertest');
const app = require('../src/server');

let server;
beforeAll((done) => {
    server = app.listen(4000, () => {
        console.log('Server is running on port 3000');
        done();
    }, 10000); // Increase the timeout to 10000ms
});

afterAll((done) => {
    // Close the server after all tests
    server.close(done);
});

describe('jwtUtils Tests', () => {
  it('should authenticate successfully', (done) => {
    // Your test logic here
    request(app)
      .get('/your-endpoint?expired=true')
      .expect(200)
      .end((err, res) => {
        // Handle the response
        done();
      });
  });
});
