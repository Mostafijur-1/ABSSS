import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/database';
import User from '@/lib/models/User';
import Course from '@/lib/models/Course';
import Blog from '@/lib/models/Blog';
import Publication from '@/lib/models/Publication';
import Event from '@/lib/models/Event';
import { requireAuth, getAuthErrorStatus } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const auth = requireAuth(request);
    await connectDB();

    const user = await User.findById(auth.userId);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Populate bookmarks
    const populatedBookmarks = [];
    for (const bm of user.bookmarks || []) {
      try {
        let itemDetails = null;
        if (bm.itemType === 'course') {
          itemDetails = await Course.findById(bm.itemId);
        } else if (bm.itemType === 'blog') {
          itemDetails = await Blog.findById(bm.itemId);
        } else if (bm.itemType === 'publication') {
          itemDetails = await Publication.findById(bm.itemId);
        } else if (bm.itemType === 'event') {
          itemDetails = await Event.findById(bm.itemId);
        }
        if (itemDetails) {
          populatedBookmarks.push({
            _id: bm._id,
            itemType: bm.itemType,
            itemId: bm.itemId,
            details: itemDetails
          });
        }
      } catch (err) {
        console.error('Failed populating bookmark:', bm, err);
      }
    }

    // Populate RSVPs
    const populatedEvents = [];
    for (const eventId of user.registeredEvents || []) {
      try {
        const eventObj = await Event.findById(eventId);
        if (eventObj) {
          populatedEvents.push(eventObj);
        }
      } catch (err) {
        console.error('Failed populating RSVP event:', eventId, err);
      }
    }

    const responseData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      bookmarks: populatedBookmarks,
      registeredEvents: populatedEvents,
      activities: user.activities || [],
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error fetching profile:', error);
    if (error instanceof Error && ['Authentication required', 'Insufficient permissions'].includes(error.message)) {
      return NextResponse.json({ message: error.message }, { status: getAuthErrorStatus(error) });
    }
    return NextResponse.json({ message: 'Failed to fetch profile' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const auth = requireAuth(request);
    await connectDB();

    const user = await User.findById(auth.userId);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const body = await request.json();
    const { action, itemId, itemType, eventId, username, email } = body || {};

    if (action === 'toggleBookmark') {
      if (!itemId || !itemType) {
        return NextResponse.json({ message: 'itemId and itemType are required for bookmarking' }, { status: 400 });
      }

      const bookmarkIndex = user.bookmarks.findIndex(
        (b: any) => b.itemType === itemType && b.itemId === itemId
      );

      let itemTitle = 'Item';
      try {
        if (itemType === 'course') {
          const item = await Course.findById(itemId);
          if (item) itemTitle = item.title;
        } else if (itemType === 'blog') {
          const item = await Blog.findById(itemId);
          if (item) itemTitle = item.title;
        } else if (itemType === 'publication') {
          const item = await Publication.findById(itemId);
          if (item) itemTitle = item.title;
        } else if (itemType === 'event') {
          const item = await Event.findById(itemId);
          if (item) itemTitle = item.title;
        }
      } catch (e) {
        console.error('Error fetching item title for bookmark activity', e);
      }

      if (bookmarkIndex > -1) {
        user.bookmarks.splice(bookmarkIndex, 1);
        user.activities.push({
          description: `Removed bookmark for ${itemType} "${itemTitle}"`
        });
      } else {
        user.bookmarks.push({ itemType, itemId });
        user.activities.push({
          description: `Bookmarked ${itemType} "${itemTitle}"`
        });
      }
    } else if (action === 'toggleRSVP') {
      if (!eventId) {
        return NextResponse.json({ message: 'eventId is required for RSVP' }, { status: 400 });
      }

      const rsvpIndex = user.registeredEvents.indexOf(eventId);
      let eventTitle = 'Event';
      try {
        const eventObj = await Event.findById(eventId);
        if (eventObj) eventTitle = eventObj.title;
      } catch (e) {
        console.error('Error fetching event title for RSVP activity', e);
      }

      if (rsvpIndex > -1) {
        user.registeredEvents.splice(rsvpIndex, 1);
        user.activities.push({
          description: `Cancelled registration for event "${eventTitle}"`
        });
      } else {
        user.registeredEvents.push(eventId);
        user.activities.push({
          description: `Registered to attend event "${eventTitle}"`
        });
      }
    } else if (action === 'updateProfile') {
      if (username) user.username = username;
      if (email) user.email = email;
      user.activities.push({
        description: 'Updated account profile details'
      });
    } else {
      return NextResponse.json({ message: 'Invalid action parameter' }, { status: 400 });
    }

    await user.save();

    // Populate bookmarks
    const populatedBookmarks = [];
    for (const bm of user.bookmarks || []) {
      try {
        let itemDetails = null;
        if (bm.itemType === 'course') {
          itemDetails = await Course.findById(bm.itemId);
        } else if (bm.itemType === 'blog') {
          itemDetails = await Blog.findById(bm.itemId);
        } else if (bm.itemType === 'publication') {
          itemDetails = await Publication.findById(bm.itemId);
        } else if (bm.itemType === 'event') {
          itemDetails = await Event.findById(bm.itemId);
        }
        if (itemDetails) {
          populatedBookmarks.push({
            _id: bm._id,
            itemType: bm.itemType,
            itemId: bm.itemId,
            details: itemDetails
          });
        }
      } catch (err) {
        console.error('Failed populating bookmark:', bm, err);
      }
    }

    // Populate RSVPs
    const populatedEvents = [];
    for (const id of user.registeredEvents || []) {
      try {
        const eventObj = await Event.findById(id);
        if (eventObj) {
          populatedEvents.push(eventObj);
        }
      } catch (err) {
        console.error('Failed populating RSVP event:', id, err);
      }
    }

    const responseData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      bookmarks: populatedBookmarks,
      registeredEvents: populatedEvents,
      activities: user.activities || [],
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    return NextResponse.json({
      message: 'Profile updated successfully',
      user: responseData
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    if (error instanceof Error && ['Authentication required', 'Insufficient permissions'].includes(error.message)) {
      return NextResponse.json({ message: error.message }, { status: getAuthErrorStatus(error) });
    }
    return NextResponse.json({ message: 'Failed to update profile' }, { status: 500 });
  }
}
