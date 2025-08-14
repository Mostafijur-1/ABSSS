import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/database';
import Event from '@/lib/models/Event';

export async function GET() {
  try {
    await connectDB();
    const events = await Event.find({}).sort({ date: -1 });
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { message: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    const event = new Event(body);
    const savedEvent = await event.save();
    
    return NextResponse.json(savedEvent, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { message: 'Failed to create event' },
      { status: 500 }
    );
  }
}
