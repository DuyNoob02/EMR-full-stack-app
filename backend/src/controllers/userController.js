const { userService } = require('../services/userService');
const { logger } = require('../config/logger');

const userController = {
  /**
   * Get current user profile
   */
  getProfile: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await userService.getUserById(id);
      
      return res.status(200).json({
        ok: true,
        status: 200,
        data: { user }
      });
    } catch (error) {
      logger.error('Get profile error:', error);
      
      return res.status(error.statusCode || 500).json({
        ok: false,
        status: error.statusCode || 500,
        code: error.code || 'GET_PROFILE_FAILED',
        message: error.message
      });
    }
  },
  
  /**
   * Update user profile
   */
  updateProfile: async (req, res) => {
    try {
      const { name, email } = req.body;
      
      const user = await userService.updateUser(req.user.id, {
        name,
        email
      });
      
      logger.info(`User profile updated: ${user.email}`);
      
      return res.status(200).json({
        ok: true,
        status: 200,
        data: { user }
      });
    } catch (error) {
      logger.error('Update profile error:', error);
      
      return res.status(error.statusCode || 500).json({
        ok: false,
        status: error.statusCode || 500,
        code: error.code || 'UPDATE_PROFILE_FAILED',
        message: error.message
      });
    }
  },
  
  /**
   * Get all users (admin only)
   */
  getAllUsers: async (req, res) => {
    try {
      const { page = 1, limit = 10, search } = req.query;
      
      const result = await userService.getAllUsers({
        page: parseInt(page),
        limit: parseInt(limit),
        search
      });
      
      return res.status(200).json({
        ok: true,
        status: 200,
        data: result.users,
        meta: {
          pagination: {
            page: result.page,
            limit: result.limit,
            total: result.total,
            pages: result.pages
          }
        }
      });
    } catch (error) {
      logger.error('Get all users error:', error);
      
      return res.status(error.statusCode || 500).json({
        ok: false,
        status: error.statusCode || 500,
        code: error.code || 'GET_USERS_FAILED',
        message: error.message
      });
    }
  },
  
  /**
   * Get user by ID (admin only)
   */
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      
      const user = await userService.getUserById(id);
      
      return res.status(200).json({
        ok: true,
        status: 200,
        data: { user }
      });
    } catch (error) {
      logger.error('Get user by ID error:', error);
      
      return res.status(error.statusCode || 500).json({
        ok: false,
        status: error.statusCode || 500,
        code: error.code || 'GET_USER_FAILED',
        message: error.message
      });
    }
  }
};

module.exports = { userController };