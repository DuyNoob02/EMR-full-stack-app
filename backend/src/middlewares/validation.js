const Joi = require('joi');

/**
 * Middleware to validate request body against Joi schema
 * @param {Object} schema - Joi validation schema
 */
const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      return res.status(400).json({
        ok: false,
        status: 400,
        code: 'VALIDATION_ERROR',
        message: error.details[0].message
      });
    }
    
    next();
  };
};

/**
 * Middleware to validate request query parameters against Joi schema
 * @param {Object} schema - Joi validation schema
 */
const validateQuery = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.query, { abortEarly: false });
    
    if (error) {
      return res.status(400).json({
        ok: false,
        status: 400,
        code: 'VALIDATION_ERROR',
        message: error.details[0].message
      });
    }
    
    next();
  };
};

/**
 * Middleware to validate request parameters against Joi schema
 * @param {Object} schema - Joi validation schema
 */
const validateParams = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.params, { abortEarly: false });
    
    if (error) {
      return res.status(400).json({
        ok: false,
        status: 400,
        code: 'VALIDATION_ERROR',
        message: error.details[0].message
      });
    }
    
    next();
  };
};

module.exports = {
  validateBody,
  validateQuery,
  validateParams
};