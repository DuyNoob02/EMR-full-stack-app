const request = require('supertest');
const app = require('../app');
const db = require('../config/database');
const { userRepository } = require('../repositories/userRepository');

describe('Auth Endpoints', () => {
  let user;
  
  beforeAll(async () => {
    // Setup test database
    await db.migrate.latest();
    await db.seed.run();
    
    // Get admin user for testing
    user = await userRepository.findByEmail('admin@example.com');
  });
  
  afterAll(async () => {
    // Cleanup
    await db.destroy();
  });
  
  describe('POST /api/v1/auth/login', () => {
    it('should login with valid credentials', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'admin@example.com',
          password: 'admin123'
        });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body.ok).toBe(true);
      expect(res.body.data).toHaveProperty('user');
      expect(res.body.data).toHaveProperty('accessToken');
      expect(res.body.data).toHaveProperty('refreshToken');
      expect(res.body.data.user.email).toBe('admin@example.com');
      expect(res.body.data.user).not.toHaveProperty('password');
    });
    
    it('should reject invalid credentials', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'admin@example.com',
          password: 'wrongpassword'
        });
      
      expect(res.statusCode).toEqual(401);
      expect(res.body.ok).toBe(false);
      expect(res.body.code).toBe('INVALID_CREDENTIALS');
    });
    
    it('should reject missing credentials', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'admin@example.com'
        });
      
      expect(res.statusCode).toEqual(400);
      expect(res.body.ok).toBe(false);
      expect(res.body.code).toBe('VALIDATION_ERROR');
    });
  });
  
  describe('POST /api/v1/auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123'
        });
      
      expect(res.statusCode).toEqual(201);
      expect(res.body.ok).toBe(true);
      expect(res.body.data).toHaveProperty('user');
      expect(res.body.data).toHaveProperty('accessToken');
      expect(res.body.data).toHaveProperty('refreshToken');
      expect(res.body.data.user.email).toBe('test@example.com');
      expect(res.body.data.user).not.toHaveProperty('password');
    });
    
    it('should reject duplicate email', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'Another User',
          email: 'admin@example.com',
          password: 'password123'
        });
      
      expect(res.statusCode).toEqual(409);
      expect(res.body.ok).toBe(false);
      expect(res.body.code).toBe('USER_EXISTS');
    });
    
    it('should reject invalid data', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'A',
          email: 'invalid-email',
          password: '123'
        });
      
      expect(res.statusCode).toEqual(400);
      expect(res.body.ok).toBe(false);
      expect(res.body.code).toBe('VALIDATION_ERROR');
    });
  });
  
  describe('POST /api/v1/auth/refresh', () => {
    let refreshToken;
    
    beforeAll(async () => {
      // Login to get refresh token
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'admin@example.com',
          password: 'admin123'
        });
      
      refreshToken = res.body.data.refreshToken;
    });
    
    it('should refresh access token with valid refresh token', async () => {
      const res = await request(app)
        .post('/api/v1/auth/refresh')
        .send({
          refreshToken
        });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body.ok).toBe(true);
      expect(res.body.data).toHaveProperty('accessToken');
      expect(res.body.data).toHaveProperty('refreshToken');
    });
    
    it('should reject invalid refresh token', async () => {
      const res = await request(app)
        .post('/api/v1/auth/refresh')
        .send({
          refreshToken: 'invalid-token'
        });
      
      expect(res.statusCode).toEqual(401);
      expect(res.body.ok).toBe(false);
      expect(res.body.code).toBe('INVALID_REFRESH_TOKEN');
    });
  });
});