const { userRepository } = require('../repositories/userRepository');
const { logger } = require('../config/logger');

const userService = {
  /**
   * Get user by ID
   */
  getUserById: async (mabn) => {
    try {
      const user = await userRepository.findById(mabn);
      
      if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        error.code = 'USER_NOT_FOUND';
        throw error;
      }
      
      // Remove password from user object
      // delete user.password;
      
      return user;
    } catch (error) {
      logger.error('Get user by ID service error:', error);
      throw error;
    }
  },
  
  /**
   * Update user
   */
  updateUser: async (id, userData) => {
    try {
      // Check if user exists
      const existingUser = await userRepository.findById(id);
      
      if (!existingUser) {
        const error = new Error('User not found');
        error.statusCode = 404;
        error.code = 'USER_NOT_FOUND';
        throw error;
      }
      
      // If email is being updated, check if it's already in use
      if (userData.email && userData.email !== existingUser.email) {
        const emailInUse = await userRepository.findByEmail(userData.email);
        
        if (emailInUse) {
          const error = new Error('Email already in use');
          error.statusCode = 409;
          error.code = 'EMAIL_IN_USE';
          throw error;
        }
      }
      
      // Update user
      const updatedUser = await userRepository.update(id, userData);
      
      // Remove password from user object
      delete updatedUser.password;
      
      return updatedUser;
    } catch (error) {
      logger.error('Update user service error:', error);
      throw error;
    }
  },
  
  /**
   * Get all users with pagination
   */
  getAllUsers: async ({ page, limit, search }) => {
    try {
      const result = await userRepository.findAll({
        page,
        limit,
        search
      });
      
      // Remove passwords from user objects
      const users = result.users.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
      
      return {
        users,
        page: result.page,
        limit: result.limit,
        total: result.total,
        pages: result.pages
      };
    } catch (error) {
      logger.error('Get all users service error:', error);
      throw error;
    }
  }
};

module.exports = { userService };