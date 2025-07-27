// Test script to check authController exports
try {
  console.log('Loading authController...');
  const authController = require('./controllers/authController');
  
  console.log('Available exports:', Object.keys(authController));
  
  // Check if each export is a function
  Object.keys(authController).forEach(key => {
    console.log(`${key}: ${typeof authController[key]}`);
    if (typeof authController[key] !== 'function') {
      console.error(`ERROR: ${key} is not a function!`);
    }
  });
  
  console.log('All exports are valid functions!');
} catch (error) {
  console.error('Error loading authController:');
  console.error('Message:', error.message);
  console.error('Stack:', error.stack);
}
