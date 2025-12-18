const db = require('../config/database');
const { logger } = require('../config/logger');

const authRepository = {
  /**
   * Store refresh token
   */
  storeRefreshToken: async ({ userId, token, ipAddress, userAgent }) => {
    try {
      await db('refresh_tokens').insert({
        user_id: userId,
        token,
        ip_address: ipAddress,
        user_agent: userAgent,
        created_at: new Date(),
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
      });
    } catch (error) {
      logger.error('Store refresh token repository error:', error);
      throw error;
    }
  },
  
  /**
   * Find refresh token
   */
  findRefreshToken: async (token) => {
    try {
      const refreshToken = await db('refresh_tokens')
        .where({ token })
        .andWhere('expires_at', '>', new Date())
        .first();
      
      return refreshToken;
    } catch (error) {
      logger.error('Find refresh token repository error:', error);
      throw error;
    }
  },
  
  /**
   * Replace refresh token
   */
  replaceRefreshToken: async (oldToken, newToken) => {
    try {
      await db.transaction(async (trx) => {
        // Get old token data
        const oldTokenData = await db('refresh_tokens')
          .where({ token: oldToken })
          .first();
        
        if (oldTokenData) {
          // Insert new token with same user data
          await db('refresh_tokens')
            .transacting(trx)
            .insert({
              user_id: oldTokenData.user_id,
              token: newToken,
              ip_address: oldTokenData.ip_address,
              user_agent: oldTokenData.user_agent,
              created_at: new Date(),
              expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
            });
          
          // Delete old token
          await db('refresh_tokens')
            .transacting(trx)
            .where({ token: oldToken })
            .del();
        }
      });
    } catch (error) {
      logger.error('Replace refresh token repository error:', error);
      throw error;
    }
  },
  
  /**
   * Remove refresh token
   */
  removeRefreshToken: async (token) => {
    try {
      await db('refresh_tokens').where({ token }).del();
    } catch (error) {
      logger.error('Remove refresh token repository error:', error);
      throw error;
    }
  },
  
  /**
   * Remove all refresh tokens for a user
   */
  removeAllUserTokens: async (userId) => {
    try {
      await db('refresh_tokens').where({ user_id: userId }).del();
    } catch (error) {
      logger.error('Remove all user tokens repository error:', error);
      throw error;
    }
  }
};

module.exports = { authRepository };