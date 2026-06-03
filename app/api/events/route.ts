import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/database';
import Event from '@/lib/models/Event';
import { getAuthErrorStatus, requirePermission } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const upcoming = searchParams.get('upcoming');
    const past = searchParams.get('past');

    const query: any = {};
    if (upcoming === 'true') query.date = { $gte: new Date() };
    if (past === 'true') query.date = { $lt: new Date() };

    const events = await Event.find(query).sort({ date: upcoming === 'true' ? 1 : -1 });
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
    requirePermission(request, 'events');
    await connectDB();
    const body = await request.json();
    
    const event = new Event(body);
    const savedEvent = await event.save();
    
    return NextResponse.json(savedEvent, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    if (error instanceof Error && ['Authentication required', 'Insufficient permissions'].includes(error.message)) {
      return NextResponse.json({ message: error.message }, { status: getAuthErrorStatus(error) });
    }
    return NextResponse.json(
      { message: 'Failed to create event' },
      { status: 500 }
    );
  }
}
