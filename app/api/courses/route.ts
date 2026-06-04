import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/database';
import Course from '@/lib/models/Course';
import { getAuthErrorStatus, requirePermission } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const query: any = {};
    if (status) {
      query.status = status;
    }

    const courses = await Course.find(query).sort({ startDate: -1, createdAt: -1 });
    return NextResponse.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { message: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    requirePermission(request, 'courses');
    await connectDB();
    const body = await request.json();
    
    const course = new Course(body);
    const savedCourse = await course.save();
    
    return NextResponse.json(savedCourse, { status: 201 });
  } catch (error) {
    console.error('Error creating course:', error);
    if (error instanceof Error && ['Authentication required', 'Insufficient permissions'].includes(error.message)) {
      return NextResponse.json({ message: error.message }, { status: getAuthErrorStatus(error) });
    }
    return NextResponse.json(
      { message: 'Failed to create course' },
      { status: 500 }
    );
  }
}
