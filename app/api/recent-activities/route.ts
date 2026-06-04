import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/database';
import RecentActivity from '@/lib/models/RecentActivity';
import { getAuthErrorStatus, requirePermission } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : 0;

    const query = RecentActivity.find({}).sort({ date: -1 });
    if (limit > 0) {
      query.limit(limit);
    }

    const activities = await query.exec();
    return NextResponse.json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json(
      { message: 'Failed to fetch activities' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    requirePermission(request, 'activities');
    await connectDB();
    const body = await request.json();
    
    const activity = new RecentActivity(body);
    const savedActivity = await activity.save();
    
    return NextResponse.json(savedActivity, { status: 201 });
  } catch (error) {
    console.error('Error creating activity:', error);
    if (error instanceof Error && ['Authentication required', 'Insufficient permissions'].includes(error.message)) {
      return NextResponse.json({ message: error.message }, { status: getAuthErrorStatus(error) });
    }
    return NextResponse.json(
      { message: 'Failed to create activity' },
      { status: 500 }
    );
  }
}
