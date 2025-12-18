const db = require('../config/database');
const { logger } = require('../config/logger');

const userRepository = {
  /**
   * Find user by ID
   */
  findById: async (mabn) => {
    try {
      const user = await db('current.dmbenhnhan').where({ mabn }).first();
      return user;
    } catch (error) {
      logger.error('Find user by ID repository error:', error);
      throw error;
    }
  },
  
  /**
   * Find user by email
   */
  findByEmail: async (email) => {
    try {
      const user = await db('users').where({ email }).first();
      return user;
    } catch (error) {
      logger.error('Find user by email repository error:', error);
      throw error;
    }
  },
  
  /**
   * Create new user
   */
  create: async (userData) => {
    try {
      const [id] = await db('users').insert(userData).returning('id');
      return await userRepository.findById(id);
    } catch (error) {
      logger.error('Create user repository error:', error);
      throw error;
    }
  },
  
  /**
   * Update user
   */
  update: async (id, userData) => {
    try {
      await db('users').where({ id }).update(userData);
      return await userRepository.findById(id);
    } catch (error) {
      logger.error('Update user repository error:', error);
      throw error;
    }
  },
  
  /**
   * Find all users with pagination
   */
  findAll: async ({ page = 1, limit = 10, search = '' }) => {
    try {
      const offset = (page - 1) * limit;
      
      let query = db('users');
      
      // Add search filter if provided
      if (search) {
        query = query.where(function() {
          this.where('name', 'ilike', `%${search}%`)
              .orWhere('email', 'ilike', `%${search}%`);
        });
      }
      
      // Get total count
      const totalResult = await query.clone().count('* as count').first();
      const total = parseInt(totalResult.count);
      
      // Get users with pagination
      const users = await query
        .select('*')
        .orderBy('created_at', 'desc')
        .limit(limit)
        .offset(offset);
      
      // Calculate total pages
      const pages = Math.ceil(total / limit);
      
      return {
        users,
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages
      };
    } catch (error) {
      logger.error('Find all users repository error:', error);
      throw error;
    }
  }
};

module.exports = { userRepository };