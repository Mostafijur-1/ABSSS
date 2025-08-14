import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/database';
import Blog from '@/lib/models/Blog';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published');
    
    let query = {};
    if (published === 'true') {
      query = { isPublished: true };
    }
    
    const blogs = await Blog.find(query).sort({ publishedDate: -1 });
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { message: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    const blog = new Blog(body);
    const savedBlog = await blog.save();
    
    return NextResponse.json(savedBlog, { status: 201 });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { message: 'Failed to create blog' },
      { status: 500 }
    );
  }
}
