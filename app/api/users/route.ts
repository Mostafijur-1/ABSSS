import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/database';
import User from '@/lib/models/User';
import { getAuthErrorStatus, requirePermission } from '@/lib/auth';

function sanitizeUser(user: any) {
  const plain = typeof user.toObject === 'function' ? user.toObject() : user;
  const { password, ...safeUser } = plain;
  return safeUser;
}

export async function GET(request: NextRequest) {
  try {
    requirePermission(request, 'users');
    await connectDB();

    const users = await User.find({}).sort({ createdAt: -1 });
    return NextResponse.json(users.map(sanitizeUser));
  } catch (error) {
    console.error('Error fetching users:', error);
    if (error instanceof Error && ['Authentication required', 'Insufficient permissions'].includes(error.message)) {
      return NextResponse.json({ message: error.message }, { status: getAuthErrorStatus(error) });
    }

    return NextResponse.json({ message: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    requirePermission(request, 'users');
    await connectDB();

    const body = await request.json();
    const { username, email, password, role = 'editor', permissions = [], isActive = true } = body || {};

    if (!username || !email || !password) {
      return NextResponse.json({ message: 'Username, email and password are required' }, { status: 400 });
    }

    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing) {
      return NextResponse.json({ message: 'User with that email or username already exists' }, { status: 409 });
    }

    const user = new User({
      username,
      email,
      password,
      role,
      permissions: role === 'admin' ? ['all'] : permissions,
      isActive
    });

    await user.save();
    return NextResponse.json(sanitizeUser(user), { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    if (error instanceof Error && ['Authentication required', 'Insufficient permissions'].includes(error.message)) {
      return NextResponse.json({ message: error.message }, { status: getAuthErrorStatus(error) });
    }
    if (error && (error as any).name === 'ValidationError') {
      return NextResponse.json({ message: 'Validation failed', errors: (error as any).errors }, { status: 400 });
    }

    return NextResponse.json({ message: 'Failed to create user' }, { status: 500 });
  }
}
