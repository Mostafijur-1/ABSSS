const Event = require('../models/Event');
const Publication = require('../models/Publication');
const Member = require('../models/Member');
const Contact = require('../models/Contact');
const User = require('../models/User');

// Get dashboard statistics
const getDashboardStats = async (req, res) => {
  try {
    // Get counts
    const totalEvents = await Event.countDocuments();
    const upcomingEvents = await Event.countDocuments({ 
      date: { $gte: new Date() },
      isUpcoming: true 
    });
    const totalPublications = await Publication.countDocuments();
    const totalMembers = await Member.countDocuments({ isActive: true });
    const unreadContacts = await Contact.countDocuments({ isRead: false });
    const totalUsers = await User.countDocuments({ isActive: true });

    // Get recent activities
    const recentEvents = await Event.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title category date createdAt');

    const recentPublications = await Publication.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title category publishedDate createdAt');

    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email subject isRead createdAt');

    const recentMembers = await Member.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name role designation department createdAt');

    // Get monthly statistics for the last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyEvents = await Event.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    const monthlyPublications = await Publication.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    // Get category distributions
    const eventCategories = await Event.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    const publicationCategories = await Publication.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    const memberRoles = await Member.aggregate([
      {
        $match: { isActive: true }
      },
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    res.json({
      stats: {
        totalEvents,
        upcomingEvents,
        totalPublications,
        totalMembers,
        unreadContacts,
        totalUsers
      },
      recentActivities: {
        events: recentEvents,
        publications: recentPublications,
        contacts: recentContacts,
        members: recentMembers
      },
      analytics: {
        monthlyEvents,
        monthlyPublications,
        eventCategories,
        publicationCategories,
        memberRoles
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get system health
const getSystemHealth = async (req, res) => {
  try {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // Get recent activity counts
    const recentEvents = await Event.countDocuments({ createdAt: { $gte: oneDayAgo } });
    const recentPublications = await Publication.countDocuments({ createdAt: { $gte: oneDayAgo } });
    const recentMembers = await Member.countDocuments({ createdAt: { $gte: oneDayAgo } });
    const recentContacts = await Contact.countDocuments({ createdAt: { $gte: oneDayAgo } });

    // Get active users (logged in within last hour)
    const activeUsers = await User.countDocuments({ lastLogin: { $gte: oneHourAgo } });

    // Database connection status (assuming MongoDB is connected)
    const dbStatus = 'connected';

    res.json({
      status: 'healthy',
      timestamp: now,
      metrics: {
        recentEvents,
        recentPublications,
        recentMembers,
        recentContacts,
        activeUsers
      },
      database: {
        status: dbStatus
      }
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'unhealthy',
      message: error.message 
    });
  }
};

module.exports = {
  getDashboardStats,
  getSystemHealth
}; 