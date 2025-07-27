const mongoose = require('mongoose');
require('dotenv').config();

const Event = require('../models/Event');
const Publication = require('../models/Publication');
const Member = require('../models/Member');
const User = require('../models/User');

const connectDB = require('../config/database');

// Sample data
const sampleEvents = [
  {
    title: "Annual Scientific Conference 2024",
    description: "Join us for our flagship annual conference featuring keynote speakers, research presentations, and networking opportunities. This year's theme focuses on 'Innovation in Scientific Research'.",
    date: new Date('2024-12-15'),
    category: 'conference',
    location: 'University Main Auditorium',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    isUpcoming: true
  },
  {
    title: "Machine Learning Workshop",
    description: "Hands-on workshop on machine learning fundamentals and applications in scientific research. No prior experience required.",
    date: new Date('2024-11-20'),
    category: 'workshop',
    location: 'Computer Science Lab',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
    isUpcoming: true
  },
  {
    title: "Research Methodology Seminar",
    description: "Learn about advanced research methodologies and statistical analysis techniques for scientific studies.",
    date: new Date('2024-10-25'),
    category: 'seminar',
    location: 'Research Center',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    isUpcoming: true
  },
  {
    title: "Science Fair 2024",
    description: "Annual science fair showcasing student research projects and innovations. Open to all university students.",
    date: new Date('2024-09-30'),
    category: 'competition',
    location: 'University Grounds',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800',
    isUpcoming: false
  }
];

const samplePublications = [
  {
    title: "Advances in Quantum Computing Applications",
    authors: ["Dr. Sarah Ahmed", "Prof. Michael Chen", "Ahmed Hassan"],
    abstract: "This paper explores the latest developments in quantum computing and their potential applications in scientific research. We present novel algorithms and discuss their implications for future research.",
    pdfUrl: "https://example.com/papers/quantum-computing-2024.pdf",
    category: "research",
    journal: "ABSSS Journal of Advanced Sciences",
    publishedDate: new Date('2024-08-15')
  },
  {
    title: "Environmental Impact of Urban Development",
    authors: ["Dr. Fatima Khan", "Mariam Ali"],
    abstract: "A comprehensive study on the environmental consequences of rapid urban development and sustainable solutions for future city planning.",
    pdfUrl: "https://example.com/papers/environmental-impact-2024.pdf",
    category: "research",
    journal: "ABSSS Environmental Studies",
    publishedDate: new Date('2024-07-20')
  },
  {
    title: "The Future of Artificial Intelligence in Healthcare",
    authors: ["Prof. David Wilson", "Dr. Aisha Rahman"],
    abstract: "Review of current AI applications in healthcare and predictions for future developments in medical technology.",
    pdfUrl: "https://example.com/papers/ai-healthcare-2024.pdf",
    category: "review",
    journal: "ABSSS Technology Review",
    publishedDate: new Date('2024-06-10')
  },
  {
    title: "Student Research Spotlight: Renewable Energy Solutions",
    authors: ["Omar Khalil", "Layla Ahmed"],
    abstract: "Undergraduate research project exploring innovative renewable energy solutions for rural communities.",
    pdfUrl: "https://example.com/papers/renewable-energy-2024.pdf",
    category: "case-study",
    journal: "ABSSS Student Research",
    publishedDate: new Date('2024-05-25')
  }
];

const sampleMembers = [
  {
    name: "Dr. Sarah Ahmed",
    role: "faculty",
    designation: "Faculty Advisor & Professor",
    email: "sarah.ahmed@university.edu",
    department: "Computer Science",
    bio: "Leading researcher in quantum computing with over 15 years of experience. Published 50+ papers in top-tier journals.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400"
  },
  {
    name: "Prof. Michael Chen",
    role: "faculty",
    designation: "Research Director",
    email: "michael.chen@university.edu",
    department: "Physics",
    bio: "Distinguished professor specializing in theoretical physics and quantum mechanics. Mentor to numerous successful researchers.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
  },
  {
    name: "Ahmed Hassan",
    role: "student",
    designation: "President",
    email: "ahmed.hassan@student.university.edu",
    department: "Computer Science",
    bio: "Final year computer science student passionate about AI and machine learning. Leading the society's technical initiatives.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400"
  },
  {
    name: "Mariam Ali",
    role: "student",
    designation: "Vice President",
    email: "mariam.ali@student.university.edu",
    department: "Environmental Science",
    bio: "Environmental science major focused on sustainable development. Organizes environmental awareness campaigns.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400"
  },
  {
    name: "Omar Khalil",
    role: "student",
    designation: "Secretary",
    email: "omar.khalil@student.university.edu",
    department: "Electrical Engineering",
    bio: "Electrical engineering student with interest in renewable energy. Manages society communications and events.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
  },
  {
    name: "Layla Ahmed",
    role: "student",
    designation: "Treasurer",
    email: "layla.ahmed@student.university.edu",
    department: "Mathematics",
    bio: "Mathematics major with strong analytical skills. Handles society finances and budget planning.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400"
  }
];

const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Clear existing data
    await Event.deleteMany({});
    await Publication.deleteMany({});
    await Member.deleteMany({});
    
    console.log('🗑️  Cleared existing data');
    
    // Insert sample data
    const events = await Event.insertMany(sampleEvents);
    const publications = await Publication.insertMany(samplePublications);
    const members = await Member.insertMany(sampleMembers);
    
    console.log(`✅ Seeded ${events.length} events`);
    console.log(`✅ Seeded ${publications.length} publications`);
    console.log(`✅ Seeded ${members.length} members`);
    
    // Seed admin users
    const adminUsers = [
      {
        username: 'admin',
        email: 'admin@absss.edu',
        password: 'admin123',
        firstName: 'System',
        lastName: 'Administrator',
        role: 'admin',
        permissions: ['events', 'publications', 'members', 'contacts', 'users']
      },
      {
        username: 'moderator',
        email: 'moderator@absss.edu',
        password: 'moderator123',
        firstName: 'Content',
        lastName: 'Moderator',
        role: 'moderator',
        permissions: ['events', 'publications', 'members', 'contacts']
      }
    ];

    for (const userData of adminUsers) {
      const existingUser = await User.findOne({ username: userData.username });
      if (!existingUser) {
        const user = new User(userData);
        await user.save();
        console.log(`✅ Created user: ${userData.username}`);
      } else {
        console.log(`ℹ️  User ${userData.username} already exists`);
      }
    }
    
    console.log('🎉 Database seeding completed successfully!');
    console.log('\n🔑 Default admin credentials:');
    console.log('Username: admin, Password: admin123');
    console.log('Username: moderator, Password: moderator123');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 