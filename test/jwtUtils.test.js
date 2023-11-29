const request = require('supertest');
const app = require('../src/server');

describe('jwtUtils Tests', () => {
    it('should authenticate successfully', async () => {
        // Your test logic here
        const response = await request(app).get('/your-endpoint?expired=true');
        expect(response.status).toBe(200);
    });
});

