import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/database';
import User from '@/lib/models/User';

export async function POST() {
  try {
    await connectDB();
    
    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: 'admin@absss.org' });
    
    if (existingAdmin) {
      return NextResponse.json({
        message: 'Admin user already exists',
        user: {
          username: existingAdmin.username,
          email: existingAdmin.email,
          role: existingAdmin.role
        }
      });
    }

    // Create default admin user
    const adminUser = new User({
      username: 'admin',
      email: 'admin@absss.org',
      password: 'admin123', // This will be hashed automatically
      role: 'admin',
      permissions: ['all'],
      isActive: true
    });

    await adminUser.save();

    return NextResponse.json({
      message: 'Admin user created successfully',
      user: {
        username: adminUser.username,
        email: adminUser.email,
        role: adminUser.role
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating admin user:', error);
    return NextResponse.json(
      { message: 'Failed to create admin user' },
      { status: 500 }
    );
  }
}
