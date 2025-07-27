const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Mock user data - in a real app this would be in a database
let users = [
  {
    _id: '1',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@absss.com',
    role: 'admin',
    permissions: ['all'],
    isActive: true,
    lastLogin: new Date(Date.now() - 3600000).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    _id: '2',
    firstName: 'John',
    lastName: 'Moderator',
    email: 'john@absss.com',
    role: 'moderator',
    permissions: ['events', 'publications', 'members'],
    isActive: true,
    lastLogin: new Date(Date.now() - 86400000).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    _id: '3',
    firstName: 'Jane',
    lastName: 'Editor',
    email: 'jane@absss.com',
    role: 'editor',
    permissions: ['publications'],
    isActive: false,
    lastLogin: new Date(Date.now() - 86400000 * 7).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 45).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 7).toISOString()
  }
];

let nextId = 4;

// GET /api/admin/users - Get all users
router.get('/', auth, (req, res) => {
  try {
    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// GET /api/admin/users/:id - Get user by ID
router.get('/:id', auth, (req, res) => {
  try {
    const user = users.find(u => u._id === req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Failed to fetch user' });
  }
});

// POST /api/admin/users - Create new user
router.post('/', auth, (req, res) => {
  try {
    const { firstName, lastName, email, role, permissions, isActive } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !role) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if email already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newUser = {
      _id: nextId.toString(),
      firstName,
      lastName,
      email,
      role,
      permissions: permissions || [],
      isActive: isActive !== undefined ? isActive : true,
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    users.push(newUser);
    nextId++;

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ message: 'Failed to create user' });
  }
});

// PUT /api/admin/users/:id - Update user
router.put('/:id', auth, (req, res) => {
  try {
    const userIndex = users.findIndex(u => u._id === req.params.id);
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { firstName, lastName, email, role, permissions, isActive } = req.body;

    // Check if email already exists for another user
    if (email) {
      const existingUser = users.find(u => u.email === email && u._id !== req.params.id);
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
    }

    // Update user
    const updatedUser = {
      ...users[userIndex],
      firstName: firstName || users[userIndex].firstName,
      lastName: lastName || users[userIndex].lastName,
      email: email || users[userIndex].email,
      role: role || users[userIndex].role,
      permissions: permissions !== undefined ? permissions : users[userIndex].permissions,
      isActive: isActive !== undefined ? isActive : users[userIndex].isActive,
      updatedAt: new Date().toISOString()
    };

    users[userIndex] = updatedUser;
    res.json(updatedUser);
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Failed to update user' });
  }
});

// PATCH /api/admin/users/:id/toggle-status - Toggle user active status
router.patch('/:id/toggle-status', auth, (req, res) => {
  try {
    const userIndex = users.findIndex(u => u._id === req.params.id);
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    users[userIndex].isActive = !users[userIndex].isActive;
    users[userIndex].updatedAt = new Date().toISOString();

    res.json(users[userIndex]);
  } catch (error) {
    console.error('Toggle user status error:', error);
    res.status(500).json({ message: 'Failed to toggle user status' });
  }
});

// DELETE /api/admin/users/:id - Delete user
router.delete('/:id', auth, (req, res) => {
  try {
    const userIndex = users.findIndex(u => u._id === req.params.id);
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Don't allow deleting the last admin
    const isAdmin = users[userIndex].role === 'admin';
    const adminCount = users.filter(u => u.role === 'admin').length;
    
    if (isAdmin && adminCount <= 1) {
      return res.status(400).json({ message: 'Cannot delete the last admin user' });
    }

    users.splice(userIndex, 1);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Failed to delete user' });
  }
});

module.exports = router;
