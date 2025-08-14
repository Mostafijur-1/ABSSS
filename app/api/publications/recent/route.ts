import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/database';
import Publication from '@/lib/models/Publication';

export async function GET() {
  try {
    await connectDB();
    
    const publications = await Publication.find()
      .sort({ publishedDate: -1 })
      .limit(10);
    
    return NextResponse.json(publications);
  } catch (error) {
    console.error('Error fetching recent publications:', error);
    return NextResponse.json(
      { message: 'Failed to fetch recent publications' },
      { status: 500 }
    );
  }
}
