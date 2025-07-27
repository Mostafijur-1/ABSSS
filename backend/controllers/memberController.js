const Member = require('../models/Member');

// Get all members
const getMembers = async (req, res) => {
  try {
    const members = await Member.find({ isActive: true }).sort({ role: 1, name: 1 });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get faculty members
const getFacultyMembers = async (req, res) => {
  try {
    const members = await Member.find({ 
      role: 'faculty', 
      isActive: true 
    }).sort({ name: 1 });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get student members
const getStudentMembers = async (req, res) => {
  try {
    const members = await Member.find({ 
      role: 'student', 
      isActive: true 
    }).sort({ name: 1 });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new member
const createMember = async (req, res) => {
  try {
    const member = new Member(req.body);
    const newMember = await member.save();
    res.status(201).json(newMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get single member
const getMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update member
const updateMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json(member);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete member
const deleteMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json({ message: 'Member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMembers,
  getFacultyMembers,
  getStudentMembers,
  createMember,
  getMember,
  updateMember,
  deleteMember
}; 