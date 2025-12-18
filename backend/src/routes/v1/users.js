const express = require('express');
const { userController } = require('../../controllers/userController');
const { requireAuth, requireRole } = require('../../middlewares/auth');
const { validateParams, validateQuery } = require('../../middlewares/validation');
const { userSchemas } = require('../../utils/validators');

const router = express.Router();

// Get current user profile
router.get('/profile/:id', userController.getProfile);

// Update user profile
router.put('/profile', requireAuth, userController.updateProfile);

// Get all users (admin only)
router.get('/', requireAuth, requireRole('admin'), validateQuery(userSchemas.list), userController.getAllUsers);

// Get user by ID (admin only)
router.get('/:id', requireAuth, requireRole('admin'), validateParams(userSchemas.id), userController.getUserById);

module.exports = router;