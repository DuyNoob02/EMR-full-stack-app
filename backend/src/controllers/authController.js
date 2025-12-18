const { authService } = require('../services/authService');
const { logger } = require('../config/logger');

const authController = {
  /**
   * Register a new user
   */
  register: async (req, res) => {
    try {
      const { email, password, name } = req.body;
      
      const result = await authService.register({
        email,
        password,
        name,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      });
      
      logger.info(`User registered: ${email}`);
      
      return res.status(201).json({
        ok: true,
        status: 201,
        data: {
          user: result.user,
          accessToken: result.accessToken,
          refreshToken: result.refreshToken
        }
      });
    } catch (error) {
      logger.error('Registration error:', error);
      
      return res.status(error.statusCode || 500).json({
        ok: false,
        status: error.statusCode || 500,
        code: error.code || 'REGISTRATION_FAILED',
        message: error.message
      });
    }
  },
  
  /**
   * Login user
   */
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const result = await authService.login({
        email,
        password,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      });
      
      logger.info(`User logged in: ${email}`);
      
      return res.status(200).json({
        ok: true,
        status: 200,
        data: {
          user: result.user,
          accessToken: result.accessToken,
          refreshToken: result.refreshToken
        }
      });
    } catch (error) {
      logger.error('Login error:', error);
      
      return res.status(error.statusCode || 500).json({
        ok: false,
        status: error.statusCode || 500,
        code: error.code || 'LOGIN_FAILED',
        message: error.message
      });
    }
  },
  
  /**
   * Refresh access token
   */
  refreshToken: async (req, res) => {
    try {
      const { refreshToken } = req.body;
      
      if (!refreshToken) {
        return res.status(400).json({
          ok: false,
          status: 400,
          code: 'REFRESH_TOKEN_REQUIRED',
          message: 'Refresh token is required'
        });
      }
      
      const result = await authService.refreshToken(refreshToken);
      
      return res.status(200).json({
        ok: true,
        status: 200,
        data: {
          accessToken: result.accessToken,
          refreshToken: result.refreshToken
        }
      });
    } catch (error) {
      logger.error('Token refresh error:', error);
      
      return res.status(error.statusCode || 500).json({
        ok: false,
        status: error.statusCode || 500,
        code: error.code || 'TOKEN_REFRESH_FAILED',
        message: error.message
      });
    }
  },
  
  /**
   * Logout user
   */
  logout: async (req, res) => {
    try {
      const { refreshToken } = req.body;
      
      if (refreshToken) {
        await authService.logout(refreshToken);
      }
      
      return res.status(200).json({
        ok: true,
        status: 200,
        data: {
          message: 'Logged out successfully'
        }
      });
    } catch (error) {
      logger.error('Logout error:', error);
      
      return res.status(error.statusCode || 500).json({
        ok: false,
        status: error.statusCode || 500,
        code: error.code || 'LOGOUT_FAILED',
        message: error.message
      });
    }
  }
};

module.exports = { authController };