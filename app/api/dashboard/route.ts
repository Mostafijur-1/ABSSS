import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/database';
import Blog from '@/lib/models/Blog';
import Event from '@/lib/models/Event';
import Member from '@/lib/models/Member';
import Publication from '@/lib/models/Publication';
import Contact from '@/lib/models/Contact';
import User from '@/lib/models/User';

export async function GET() {
  try {
    await connectDB();
    
    // Get all stats in parallel
    const [
      totalBlogs,
      publishedBlogs,
      totalEvents,
      upcomingEvents,
      totalMembers,
      totalPublications,
      Contact.countDocuments({ isRead: false }),
      totalUsers,
      recentBlogs,
      recentEvents
    ] = await Promise.all([
      Blog.countDocuments(),
      Blog.countDocuments({ isPublished: true }),
      Event.countDocuments(),
      Event.countDocuments({ date: { $gte: new Date() } }),
      Member.countDocuments(),
      Publication.countDocuments(),
      unreadContacts,
      User.countDocuments(),
      Blog.find().sort({ createdAt: -1 }).limit(5),
      Event.find().sort({ createdAt: -1 }).limit(5)
    ]);

    const stats = {
      stats: {
        totalEvents,
        upcomingEvents,
        totalPublications,
        totalBlogs,
        publishedBlogs,
        draftBlogs: totalBlogs - publishedBlogs,
        totalMembers,
        unreadContacts,
        totalUsers
      },
      recentActivities: {
        events: recentEvents,
        publications: [],
        blogs: recentBlogs,
        contacts: [],
        members: []
      },
      analytics: {
        monthlyEvents: [],
        monthlyPublications: [],
        eventCategories: [],
        publicationCategories: [],
        memberRoles: []
      }
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}
