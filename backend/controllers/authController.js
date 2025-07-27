const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '24h' }
  );
};

// Login user
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Find user by username or email
    const user = await User.findOne({
      $or: [{ username }, { email: username }]
    });

    if (!user || !user.isActive) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    // Return user data (without password) and token
    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      permissions: user.permissions,
      lastLogin: user.lastLogin
    };

    res.json({
      message: 'Login successful',
      token,
      user: userData
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get current user profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const { username, email } = req.body;
    
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields
    if (username) user.username = username;
    if (email) user.email = email;

    await user.save();

    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      permissions: user.permissions,
      lastLogin: user.lastLogin
    };

    res.json({
      message: 'Profile updated successfully',
      user: userData
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Change password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current and new password are required' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users (admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new user (admin only)
const createUser = async (req, res) => {
  try {
    const { username, email, password, role, permissions } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    const user = new User({
      username,
      email,
      password,
      role: role || 'editor',
      permissions: permissions || ['events', 'publications', 'members', 'contacts']
    });

    await user.save();

    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      permissions: user.permissions,
      isActive: user.isActive,
      createdAt: user.createdAt
    };

    res.status(201).json({
      message: 'User created successfully',
      user: userData
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user (admin only)
const updateUser = async (req, res) => {
  try {
    const { username, email, role, permissions, isActive } = req.body;
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields
    if (username) user.username = username;
    if (email) user.email = email;
    if (role) user.role = role;
    if (permissions) user.permissions = permissions;
    if (typeof isActive === 'boolean') user.isActive = isActive;

    await user.save();

    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      permissions: user.permissions,
      isActive: user.isActive,
      updatedAt: user.updatedAt
    };

    res.json({
      message: 'User updated successfully',
      user: userData
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user (admin only)
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Prevent deleting self
    if (userId === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Toggle user status (admin only)
const toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isActive = !user.isActive;
    await user.save();

    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      permissions: user.permissions,
      isActive: user.isActive,
      lastLogin: user.lastLogin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    res.json({
      message: 'User status updated successfully',
      user: userData
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  login,
  getProfile,
  updateProfile,
  changePassword,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  toggleUserStatus
}; 