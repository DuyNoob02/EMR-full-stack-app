const express = require('express');
const { authController } = require('../../controllers/authController');
const { validateBody } = require('../../middlewares/validation');
const { authSchemas } = require('../../utils/validators');

const router = express.Router();

// Register new user
router.post('/register', validateBody(authSchemas.register), authController.register);

// Login user
router.post('/login', validateBody(authSchemas.login), authController.login);

// Refresh access token
router.post('/refresh', authController.refreshToken);

// Logout user
router.post('/logout', authController.logout);

module.exports = router;