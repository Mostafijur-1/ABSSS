import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/database';
import Member from '@/lib/models/Member';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');
    const active = searchParams.get('active');
    
    let query = {};
    if (role) {
      query = { ...query, role };
    }
    if (active === 'true') {
      query = { ...query, isActive: true };
    }
    
    const members = await Member.find(query).sort({ joinDate: -1 });
    return NextResponse.json(members);
  } catch (error) {
    console.error('Error fetching members:', error);
    return NextResponse.json(
      { message: 'Failed to fetch members' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    const member = new Member(body);
    const savedMember = await member.save();
    
    return NextResponse.json(savedMember, { status: 201 });
  } catch (error) {
    console.error('Error creating member:', error);
    return NextResponse.json(
      { message: 'Failed to create member' },
      { status: 500 }
    );
  }
}
