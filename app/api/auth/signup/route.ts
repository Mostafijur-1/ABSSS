import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/database';
import User from '@/lib/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_SIGNUP_SECRET = process.env.ADMIN_SIGNUP_SECRET;

const ALLOWED_ROLES = ['admin', 'moderator', 'editor'];

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { username, email, password, role } = body || {};

    if (!username || !email || !password) {
      return NextResponse.json({ message: 'Username, email and password are required' }, { status: 400 });
    }

    // Determine role (default to 'editor') and validate
    let assignedRole = (role && String(role).toLowerCase()) || 'editor';
    if (!ALLOWED_ROLES.includes(assignedRole)) assignedRole = 'editor';

    // Protect admin creation via secret (if ADMIN_SIGNUP_SECRET is configured)
    if (assignedRole === 'admin') {
      const provided = request.headers.get('x-admin-secret') || '';
      if (!ADMIN_SIGNUP_SECRET || provided !== ADMIN_SIGNUP_SECRET) {
        return NextResponse.json({ message: 'Unauthorized to create admin user' }, { status: 403 });
      }
    }

    // Check for existing user by email or username
    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) {
      return NextResponse.json({ message: 'User with that email or username already exists' }, { status: 409 });
    }

    // Create user
    const newUser = new User({
      username,
      email,
      password,
      role: assignedRole,
      permissions: assignedRole === 'admin' ? ['all'] : [],
      isActive: true
    });

    await newUser.save();

    // Prepare JWT if secret is available
    let token = null;
    if (JWT_SECRET) {
      token = jwt.sign(
        {
          userId: newUser._id,
          email: newUser.email,
          role: newUser.role,
          permissions: newUser.permissions
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      );
    }

    const userResponse = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      permissions: newUser.permissions,
      isActive: newUser.isActive,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt
    };

    return NextResponse.json(
      { message: 'Signup successful', user: userResponse, token },
      { status: 201 }
    );

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ message: 'Signup failed' }, { status: 500 });
  }
}
