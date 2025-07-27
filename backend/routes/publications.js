const express = require('express');
const router = express.Router();
const {
  getPublications,
  getRecentPublications,
  createPublication,
  getPublication,
  updatePublication,
  deletePublication
} = require('../controllers/publicationController');

// GET /api/publications - Get all publications
router.get('/', getPublications);

// GET /api/publications/recent - Get recent publications
router.get('/recent', getRecentPublications);

// POST /api/publications - Create new publication
router.post('/', createPublication);

// GET /api/publications/:id - Get single publication
router.get('/:id', getPublication);

// PUT /api/publications/:id - Update publication
router.put('/:id', updatePublication);

// DELETE /api/publications/:id - Delete publication
router.delete('/:id', deletePublication);

module.exports = router; 