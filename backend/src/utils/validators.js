const Joi = require('joi');

const authSchemas = {
  register: Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
  }),
  
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),
  
  refreshToken: Joi.object({
    refreshToken: Joi.string().required()
  })
};

const userSchemas = {
  update: Joi.object({
    name: Joi.string().min(2).max(50),
    email: Joi.string().email()
  }),
  
  id: Joi.object({
    id: Joi.string().uuid().required()
  }),
  
  list: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    search: Joi.string().max(100).allow('')
  })
};

module.exports = {
  authSchemas,
  userSchemas
};