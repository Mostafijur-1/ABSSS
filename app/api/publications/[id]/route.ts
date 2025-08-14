import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/database';
import Publication from '@/lib/models/Publication';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const publication = await Publication.findById(params.id);
    
    if (!publication) {
      return NextResponse.json(
        { message: 'Publication not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(publication);
  } catch (error) {
    console.error('Error fetching publication:', error);
    return NextResponse.json(
      { message: 'Failed to fetch publication' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await request.json();
    
    const updatedPublication = await Publication.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!updatedPublication) {
      return NextResponse.json(
        { message: 'Publication not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedPublication);
  } catch (error) {
    console.error('Error updating publication:', error);
    return NextResponse.json(
      { message: 'Failed to update publication' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const deletedPublication = await Publication.findByIdAndDelete(params.id);
    
    if (!deletedPublication) {
      return NextResponse.json(
        { message: 'Publication not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Publication deleted successfully' });
  } catch (error) {
    console.error('Error deleting publication:', error);
    return NextResponse.json(
      { message: 'Failed to delete publication' },
      { status: 500 }
    );
  }
}
