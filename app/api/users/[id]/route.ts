import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/database';
import User from '@/lib/models/User';
import { getAuthErrorStatus, requirePermission } from '@/lib/auth';

function sanitizeUser(user: any) {
  const plain = typeof user.toObject === 'function' ? user.toObject() : user;
  const { password, ...safeUser } = plain;
  return safeUser;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    requirePermission(request, 'users');
    await connectDB();

    const user = await User.findById(params.id);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(sanitizeUser(user));
  } catch (error) {
    console.error('Error fetching user:', error);
    if (error instanceof Error && ['Authentication required', 'Insufficient permissions'].includes(error.message)) {
      return NextResponse.json({ message: error.message }, { status: getAuthErrorStatus(error) });
    }

    return NextResponse.json({ message: 'Failed to fetch user' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    requirePermission(request, 'users');
    await connectDB();

    const body = await request.json();
    const update: any = { ...body };

    if (!update.password) {
      delete update.password;
    }
    if (update.role === 'admin') {
      update.permissions = ['all'];
    }

    const user = await User.findById(params.id).select('+password');
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    Object.assign(user, update);
    await user.save();

    return NextResponse.json(sanitizeUser(user));
  } catch (error) {
    console.error('Error updating user:', error);
    if (error instanceof Error && ['Authentication required', 'Insufficient permissions'].includes(error.message)) {
      return NextResponse.json({ message: error.message }, { status: getAuthErrorStatus(error) });
    }
    if (error && (error as any).name === 'ValidationError') {
      return NextResponse.json({ message: 'Validation failed', errors: (error as any).errors }, { status: 400 });
    }

    return NextResponse.json({ message: 'Failed to update user' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    requirePermission(request, 'users');
    await connectDB();

    const user = await User.findById(params.id);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    user.isActive = !user.isActive;
    await user.save();

    return NextResponse.json(sanitizeUser(user));
  } catch (error) {
    console.error('Error toggling user status:', error);
    if (error instanceof Error && ['Authentication required', 'Insufficient permissions'].includes(error.message)) {
      return NextResponse.json({ message: error.message }, { status: getAuthErrorStatus(error) });
    }

    return NextResponse.json({ message: 'Failed to update user status' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authUser = requirePermission(request, 'users');
    if (authUser.userId === params.id) {
      return NextResponse.json({ message: 'You cannot delete your own account' }, { status: 400 });
    }

    await connectDB();
    const user = await User.findByIdAndDelete(params.id);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    if (error instanceof Error && ['Authentication required', 'Insufficient permissions'].includes(error.message)) {
      return NextResponse.json({ message: error.message }, { status: getAuthErrorStatus(error) });
    }

    return NextResponse.json({ message: 'Failed to delete user' }, { status: 500 });
  }
}
