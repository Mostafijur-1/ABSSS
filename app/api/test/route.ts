import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/database';
import mongoose from 'mongoose';

export async function GET() {
  try {
    const conn = await connectDB();
    
    // Get connection details
    const connectionInfo = {
      status: 'Connected',
      host: mongoose.connection.host,
      name: mongoose.connection.name,
      readyState: mongoose.connection.readyState,
      readyStateText: getReadyStateText(mongoose.connection.readyState),
      timestamp: new Date().toISOString(),
      mongooseVersion: mongoose.version
    };
    
    return NextResponse.json({ 
      message: 'Database connection successful!',
      connection: connectionInfo
    });
  } catch (error) {
    console.error('Database connection failed:', error);
    return NextResponse.json(
      { 
        message: 'Database connection failed!',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

function getReadyStateText(state: number): string {
  switch (state) {
    case 0: return 'Disconnected';
    case 1: return 'Connected';
    case 2: return 'Connecting';
    case 3: return 'Disconnecting';
    default: return 'Unknown';
  }
}
