// MongoDB Connection Test Script
const { connectDB } = require('./lib/database.ts');

async function testConnection() {
  console.log('🔍 Testing MongoDB Connection...');
  
  try {
    await connectDB();
    console.log('✅ MongoDB connection test passed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ MongoDB connection test failed:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
}

testConnection();
