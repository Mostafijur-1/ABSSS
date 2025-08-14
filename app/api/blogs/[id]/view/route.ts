import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/database';
import Blog from '@/lib/models/Blog';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const blog = await Blog.findByIdAndUpdate(
      params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    
    if (!blog) {
      return NextResponse.json(
        { message: 'Blog not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error incrementing blog views:', error);
    return NextResponse.json(
      { message: 'Failed to increment views' },
      { status: 500 }
    );
  }
}
