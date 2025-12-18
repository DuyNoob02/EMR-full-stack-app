const { verifyAccessToken } = require('../config/auth');
const { userRepository } = require('../repositories/userRepository');
const { logger } = require('../config/logger');

/**
 * Middleware to check if user is authenticated
 */
const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        ok: false,
        status: 401,
        code: 'AUTH_REQUIRED',
        message: 'Authentication required'
      });
    }
    
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    const decoded = verifyAccessToken(token);
    
    // Get user from database
    const user = await userRepository.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({
        ok: false,
        status: 401,
        code: 'USER_NOT_FOUND',
        message: 'User not found'
      });
    }
    
    // Add user to request object
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role
    };
    
    next();
  } catch (error) {
    logger.error('Authentication error:', error);
    return res.status(401).json({
      ok: false,
      status: 401,
      code: 'INVALID_TOKEN',
      message: 'Invalid or expired token'
    });
  }
};

/**
 * Middleware to check if user has specific role
 * @param {string|Array} roles - Required role(s)
 */
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        ok: false,
        status: 401,
        code: 'AUTH_REQUIRED',
        message: 'Authentication required'
      });
    }
    
    const userRole = req.user.role;
    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        ok: false,
        status: 403,
        code: 'INSUFFICIENT_PERMISSIONS',
        message: 'Insufficient permissions'
      });
    }
    
    next();
  };
};

module.exports = {
  requireAuth,
  requireRole
};