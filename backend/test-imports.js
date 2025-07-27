// Simple test for each function
const express = require('express');

try {
  console.log('Testing individual imports...');
  
  const {
    login,
    getProfile,
    updateProfile,
    changePassword,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    toggleUserStatus
  } = require('./controllers/authController');
  
  console.log('login:', typeof login);
  console.log('getProfile:', typeof getProfile);
  console.log('updateProfile:', typeof updateProfile);
  console.log('changePassword:', typeof changePassword);
  console.log('getAllUsers:', typeof getAllUsers);
  console.log('createUser:', typeof createUser);
  console.log('updateUser:', typeof updateUser);
  console.log('deleteUser:', typeof deleteUser);
  console.log('toggleUserStatus:', typeof toggleUserStatus);
  
  console.log('All functions loaded successfully!');
  
} catch (error) {
  console.error('Error:', error.message);
  console.error('Stack:', error.stack);
}
