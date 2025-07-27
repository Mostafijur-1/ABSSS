const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getSystemHealth
} = require('../controllers/dashboardController');
const { authenticateToken, requirePermission } = require('../middleware/auth');

// Get dashboard statistics (requires authentication)
router.get('/stats', authenticateToken, getDashboardStats);

// Get system health (requires authentication)
router.get('/health', authenticateToken, getSystemHealth);

module.exports = router; 