const { logger } = require('../config/logger');

/**
 * Global error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  // Log error
  logger.error({
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userId: req.user?.id || null,
    correlationId: req.correlationId || null
  });
  
  // Default error
  let error = {
    ok: false,
    status: 500,
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Something went wrong'
  };
  
  // Joi validation error
  if (err.isJoi) {
    error.status = 400;
    error.code = 'VALIDATION_ERROR';
    error.message = err.details[0].message;
  }
  
  // JWT error
  if (err.name === 'JsonWebTokenError') {
    error.status = 401;
    error.code = 'INVALID_TOKEN';
    error.message = 'Invalid token';
  }
  
  // JWT expired error
  if (err.name === 'TokenExpiredError') {
    error.status = 401;
    error.code = 'TOKEN_EXPIRED';
    error.message = 'Token expired';
  }
  
  // Custom application error
  if (err.isOperational) {
    error.status = err.statusCode || 500;
    error.code = err.code || 'APPLICATION_ERROR';
    error.message = err.message;
  }
  
  res.status(error.status).json(error);
};

module.exports = { errorHandler };