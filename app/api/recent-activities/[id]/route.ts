import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/database';
import RecentActivity from '@/lib/models/RecentActivity';
import { getAuthErrorStatus, requirePermission } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const activity = await RecentActivity.findById(params.id);
    
    if (!activity) {
      return NextResponse.json(
        { message: 'Activity not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(activity);
  } catch (error) {
    console.error('Error fetching activity:', error);
    return NextResponse.json(
      { message: 'Failed to fetch activity' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    requirePermission(request, 'activities');
    await connectDB();
    const body = await request.json();
    
    const updatedActivity = await RecentActivity.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!updatedActivity) {
      return NextResponse.json(
        { message: 'Activity not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedActivity);
  } catch (error) {
    console.error('Error updating activity:', error);
    if (error instanceof Error && ['Authentication required', 'Insufficient permissions'].includes(error.message)) {
      return NextResponse.json({ message: error.message }, { status: getAuthErrorStatus(error) });
    }
    return NextResponse.json(
      { message: 'Failed to update activity' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    requirePermission(request, 'activities');
    await connectDB();
    const deletedActivity = await RecentActivity.findByIdAndDelete(params.id);
    
    if (!deletedActivity) {
      return NextResponse.json(
        { message: 'Activity not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    console.error('Error deleting activity:', error);
    if (error instanceof Error && ['Authentication required', 'Insufficient permissions'].includes(error.message)) {
      return NextResponse.json({ message: error.message }, { status: getAuthErrorStatus(error) });
    }
    return NextResponse.json(
      { message: 'Failed to delete activity' },
      { status: 500 }
    );
  }
}
