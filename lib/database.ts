// lib/mongodb.ts
import mongoose from 'mongoose';

declare global {
  // Extend globalThis with mongoose cache
  // eslint-disable-next-line no-var
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Ensure the cache object always exists
const cached = global.mongooseCache || (global.mongooseCache = { conn: null, promise: null });

export async function connectDB() {
  if (cached.conn) {
    console.log('⚡ Using existing MongoDB connection');
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false })
      .then((mongoose) => mongoose);
  }

  try {
    cached.conn = await cached.promise;
    console.log('✅ MongoDB connected successfully!');
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}
