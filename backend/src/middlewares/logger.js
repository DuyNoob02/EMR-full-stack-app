const { v4: uuidv4 } = require('uuid');
const { logger } = require('../config/logger');

/**
 * Middleware to add request ID and log requests
 */
const requestLogger = (req, res, next) => {
  // Add correlation ID to request
  req.correlationId = uuidv4();
  
  // Log request
  logger.info({
    message: 'API Request',
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    correlationId: req.correlationId
  });
  
  // Override res.end to log response
  const originalEnd = res.end;
  res.end = function (chunk, encoding) {
    // Log response
    logger.info({
      message: 'API Response',
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      correlationId: req.correlationId
    });
    
    originalEnd.call(this, chunk, encoding);
  };
  
  next();
};

module.exports = { requestLogger };