import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/database';
import Blog from '@/lib/models/Blog';

export async function GET() {
  try {
    await connectDB();
    
    const blogs = await Blog.find({ isPublished: true })
      .sort({ publishedDate: -1 })
      .limit(10);
    
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error fetching published blogs:', error);
    return NextResponse.json(
      { message: 'Failed to fetch published blogs' },
      { status: 500 }
    );
  }
}
