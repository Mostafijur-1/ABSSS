import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/database';
import Blog from '@/lib/models/Blog';

export async function GET(
  request: NextRequest,
  { params }: { params: { category: string } }
) {
  try {
    await connectDB();
    
    const blogs = await Blog.find({ 
      category: params.category,
      isPublished: true 
    }).sort({ publishedDate: -1 });
    
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs by category:', error);
    return NextResponse.json(
      { message: 'Failed to fetch blogs by category' },
      { status: 500 }
    );
  }
}
