import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/database';
import Publication from '@/lib/models/Publication';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const recent = searchParams.get('recent');
    
    let query = {};
    if (category) {
      query = { category };
    }
    
    let sortOptions = { publishedDate: -1 };
    let limit = undefined;
    
    if (recent === 'true') {
      limit = 5;
    }
    
    const publications = await Publication.find(query)
      .sort(sortOptions)
      .limit(limit || 0);
    
    return NextResponse.json(publications);
  } catch (error) {
    console.error('Error fetching publications:', error);
    return NextResponse.json(
      { message: 'Failed to fetch publications' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    const publication = new Publication(body);
    const savedPublication = await publication.save();
    
    return NextResponse.json(savedPublication, { status: 201 });
  } catch (error) {
    console.error('Error creating publication:', error);
    return NextResponse.json(
      { message: 'Failed to create publication' },
      { status: 500 }
    );
  }
}
