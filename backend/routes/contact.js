const express = require('express');
const router = express.Router();
const {
  getContacts,
  createContact,
  getContact,
  markAsRead,
  deleteContact
} = require('../controllers/contactController');

// GET /api/contact - Get all contact messages (admin)
router.get('/', getContacts);

// POST /api/contact - Create new contact message
router.post('/', createContact);

// GET /api/contact/:id - Get single contact message
router.get('/:id', getContact);

// PUT /api/contact/:id/read - Mark contact as read
router.put('/:id/read', markAsRead);

// DELETE /api/contact/:id - Delete contact message
router.delete('/:id', deleteContact);

module.exports = router; 