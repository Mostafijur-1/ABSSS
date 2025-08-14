import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/database';

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ 
      message: 'Database connection successful!',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Database connection failed:', error);
    return NextResponse.json(
      { message: 'Database connection failed!' },
      { status: 500 }
    );
  }
}
