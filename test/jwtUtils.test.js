const jwtUtils = require('../src/jwtUtils');

describe('JWT Utility Functions', () => {
  describe('authenticate', () => {
    it('should return a valid JWT when a valid key is present', () => {
      // Mock request and response objects
      const req = { query: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock database response with a valid key
      const dbGetMock = jest.fn().mockImplementation((query, callback) => {
        callback(null, { kid: 1, key: 'base64url-encoded-key', exp: Date.now() + 3600000 });
      });
      jest.mock('../src/db', () => ({ get: dbGetMock }));

      // Call the authenticate function
      jwtUtils.authenticate(req, res);

      // Assertions
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ token: expect.any(String) });
    });

    // Add more test cases for different scenarios (expired key, invalid key, etc.)
  });

  describe('getJWKS', () => {
    it('should return a valid JWKS when valid keys are present in the database', () => {
      // Mock request and response objects
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Mock database response with valid keys
      const dbAllMock = jest.fn().mockImplementation((query, callback) => {
        callback(null, [
          { kid: 1, key: 'base64url-encoded-key1', exp: Date.now() + 3600000 },
          { kid: 2, key: 'base64url-encoded-key2', exp: Date.now() + 7200000 },
        ]);
      });
      jest.mock('../src/db', () => ({ all: dbAllMock }));

      // Call the getJWKS function
      jwtUtils.getJWKS(req, res);

      // Assertions
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        keys: [
          { kid: '1', kty: 'RSA', n: 'base64url-encoded-modulus', e: 'base64url-encoded-exponent' },
          { kid: '2', kty: 'RSA', n: 'base64url-encoded-modulus', e: 'base64url-encoded-exponent' },
        ],
      });
    });

  });
});

