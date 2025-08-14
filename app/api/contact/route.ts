import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/database';
import Contact from '@/lib/models/Contact';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    const contact = new Contact(body);
    const savedContact = await contact.save();
    
    return NextResponse.json(
      { 
        message: 'Contact form submitted successfully',
        contact: savedContact 
      }, 
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return NextResponse.json(
      { message: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const unread = searchParams.get('unread');
    
    let query = {};
    if (unread === 'true') {
      query = { isRead: false };
    }
    
    const contacts = await Contact.find(query).sort({ createdAt: -1 });
    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { message: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}
