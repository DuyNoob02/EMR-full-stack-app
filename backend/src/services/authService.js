const bcrypt = require('bcrypt');
const { userRepository } = require('../repositories/userRepository');
const { authRepository } = require('../repositories/authRepository');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../config/auth');
const { logger } = require('../config/logger');

const SALT_ROUNDS = 10;

const authService = {
  /**
   * Register a new user
   */
  register: async ({ email, password, name, ipAddress, userAgent }) => {
    try {
      // Check if user already exists
      const existingUser = await userRepository.findByEmail(email);
      
      if (existingUser) {
        const error = new Error('User already exists');
        error.statusCode = 409;
        error.code = 'USER_EXISTS';
        throw error;
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      
      // Create user
      const user = await userRepository.create({
        email,
        password: hashedPassword,
        name,
        role: 'user'
      });
      
      // Generate tokens
      const accessToken = generateAccessToken({ userId: user.id });
      const refreshToken = generateRefreshToken({ userId: user.id });
      
      // Store refresh token
      await authRepository.storeRefreshToken({
        userId: user.id,
        token: refreshToken,
        ipAddress,
        userAgent
      });
      
      // Remove password from user object
      delete user.password;
      
      return {
        user,
        accessToken,
        refreshToken
      };
    } catch (error) {
      logger.error('Registration service error:', error);
      throw error;
    }
  },
  
  /**
   * Login user
   */
  login: async ({ email, password, ipAddress, userAgent }) => {
    try {
      // Find user by email
      const user = await userRepository.findByEmail(email);
      
      if (!user) {
        const error = new Error('Invalid credentials');
        error.statusCode = 401;
        error.code = 'INVALID_CREDENTIALS';
        throw error;
      }
      
      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (!isPasswordValid) {
        const error = new Error('Invalid credentials');
        error.statusCode = 401;
        error.code = 'INVALID_CREDENTIALS';
        throw error;
      }
      
      // Generate tokens
      const accessToken = generateAccessToken({ userId: user.id });
      const refreshToken = generateRefreshToken({ userId: user.id });
      
      // Store refresh token
      await authRepository.storeRefreshToken({
        userId: user.id,
        token: refreshToken,
        ipAddress,
        userAgent
      });
      
      // Remove password from user object
      delete user.password;
      
      return {
        user,
        accessToken,
        refreshToken
      };
    } catch (error) {
      logger.error('Login service error:', error);
      throw error;
    }
  },
  
  /**
   * Refresh access token
   */
  refreshToken: async (refreshToken) => {
    try {
      // Verify refresh token
      const decoded = verifyRefreshToken(refreshToken);
      
      // Check if refresh token exists in database
      const storedToken = await authRepository.findRefreshToken(refreshToken);
      
      if (!storedToken) {
        const error = new Error('Invalid refresh token');
        error.statusCode = 401;
        error.code = 'INVALID_REFRESH_TOKEN';
        throw error;
      }
      
      // Get user
      const user = await userRepository.findById(decoded.userId);
      
      if (!user) {
        const error = new Error('User not found');
        error.statusCode = 401;
        error.code = 'USER_NOT_FOUND';
        throw error;
      }
      
      // Generate new tokens
      const newAccessToken = generateAccessToken({ userId: user.id });
      const newRefreshToken = generateRefreshToken({ userId: user.id });
      
      // Replace old refresh token with new one
      await authRepository.replaceRefreshToken(refreshToken, newRefreshToken);
      
      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      };
    } catch (error) {
      logger.error('Token refresh service error:', error);
      throw error;
    }
  },
  
  /**
   * Logout user
   */
  logout: async (refreshToken) => {
    try {
      // Remove refresh token from database
      await authRepository.removeRefreshToken(refreshToken);
      
      return { success: true };
    } catch (error) {
      logger.error('Logout service error:', error);
      throw error;
    }
  }
};

module.exports = { authService };