const express = require('express');
const router = express.Router();
const {
  getMembers,
  getFacultyMembers,
  getStudentMembers,
  createMember,
  getMember,
  updateMember,
  deleteMember
} = require('../controllers/memberController');

// GET /api/members - Get all members
router.get('/', getMembers);

// GET /api/members/faculty - Get faculty members
router.get('/faculty', getFacultyMembers);

// GET /api/members/students - Get student members
router.get('/students', getStudentMembers);

// POST /api/members - Create new member
router.post('/', createMember);

// GET /api/members/:id - Get single member
router.get('/:id', getMember);

// PUT /api/members/:id - Update member
router.put('/:id', updateMember);

// DELETE /api/members/:id - Delete member
router.delete('/:id', deleteMember);

module.exports = router; 