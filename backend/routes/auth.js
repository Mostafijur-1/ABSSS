const express = require('express');
const router = express.Router();
const {
  login,
  getProfile,
  updateProfile,
  changePassword,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/authController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// Public routes
router.post('/login', login);

// Protected routes (require authentication)
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);
router.put('/change-password', authenticateToken, changePassword);

// Admin routes (require admin role)
router.get('/users', authenticateToken, requireAdmin, getAllUsers);
// router.post('/users', authenticateToken, requireAdmin, createUser);
router.post('/users', createUser);
router.put('/users/:id', authenticateToken, requireAdmin, updateUser);
router.delete('/users/:id', authenticateToken, requireAdmin, deleteUser);

module.exports = router; 