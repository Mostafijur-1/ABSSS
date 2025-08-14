import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/database';
import Blog from '@/lib/models/Blog';

export async function POST() {
  try {
    await connectDB();
    
    // Create multiple sample blogs
    const sampleBlogs = [
      {
        title: "Getting Started with Research: A Student's Guide",
        content: "Research can seem daunting for new students, but with the right approach and mindset, it becomes an exciting journey of discovery. This guide will walk you through the essential steps to begin your research journey, from choosing a topic to presenting your findings.\n\nThe first step in any research project is identifying a compelling research question. This question should be specific enough to be answerable within your timeframe, yet broad enough to make a meaningful contribution to your field.\n\nNext, conduct a thorough literature review to understand what has already been studied in your area of interest. This will help you identify gaps in existing knowledge and position your research within the broader academic conversation.",
        excerpt: "A comprehensive guide for students beginning their research journey, covering everything from topic selection to presentation of findings.",
        author: "Dr. Academic Guide",
        category: "tutorial",
        tags: ["research", "students", "guide", "academic"],
        imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800",
        publishedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        isPublished: true,
        views: 156
      },
      {
        title: "Latest Developments in Artificial Intelligence",
        content: "The field of artificial intelligence continues to evolve at a rapid pace, with new breakthroughs emerging regularly. In this post, we explore some of the most significant recent developments that are shaping the future of AI.\n\nLarge Language Models (LLMs) have revolutionized natural language processing, enabling more sophisticated human-computer interactions. These models can understand context, generate human-like text, and even assist in coding tasks.\n\nComputer vision has also seen remarkable advances, with AI systems now capable of recognizing objects, understanding scenes, and even generating realistic images from textual descriptions.\n\nThe integration of AI in various industries continues to accelerate, from healthcare diagnostics to autonomous vehicles, promising to transform how we work and live.",
        excerpt: "Exploring the latest breakthroughs in AI technology and their potential impact on various industries.",
        author: "Prof. AI Expert",
        category: "technology",
        tags: ["ai", "machine learning", "technology", "innovation"],
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
        publishedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        isPublished: true,
        views: 289
      },
      {
        title: "ABSSS Annual Conference 2025 Highlights",
        content: "The Al Biruni Society of Scientific Studies held its annual conference last month, bringing together researchers, students, and academics from various fields. The event was a tremendous success, featuring keynote speeches, paper presentations, and networking opportunities.\n\nThis year's theme, 'Science for Sustainable Future,' attracted over 200 participants who shared their research on environmental sustainability, renewable energy, and climate change mitigation.\n\nKeynote speakers included renowned scientists and researchers who shared their insights on cutting-edge research and future directions in their respective fields.\n\nThe conference also featured student presentation sessions, where young researchers had the opportunity to present their work and receive feedback from experienced academics.\n\nWe extend our gratitude to all participants, speakers, and sponsors who made this event possible. Planning for next year's conference is already underway!",
        excerpt: "Recap of the successful ABSSS Annual Conference 2025, featuring highlights from keynote speeches and student presentations.",
        author: "ABSSS Event Team",
        category: "events",
        tags: ["conference", "absss", "research", "networking"],
        imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800",
        publishedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
        isPublished: true,
        views: 412
      },
      {
        title: "Research Collaboration Opportunities",
        content: "ABSSS is excited to announce new research collaboration opportunities for students and faculty members. We believe that collaborative research leads to more innovative solutions and broader impact.\n\nWe are currently seeking collaborators for several ongoing research projects in areas including:\n\n- Sustainable technology development\n- Data science and analytics\n- Environmental science research\n- Social science studies\n\nThese collaborations offer excellent opportunities for knowledge exchange, skill development, and publication of joint research papers.\n\nInterested researchers can contact our research coordination team to learn more about available projects and how to get involved.\n\nWe also encourage members to propose new collaborative projects that align with our mission of advancing scientific knowledge and promoting research excellence.",
        excerpt: "New research collaboration opportunities available for ABSSS members in various fields of study.",
        author: "Research Coordination Team",
        category: "news",
        tags: ["collaboration", "research", "opportunities", "partnership"],
        imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
        publishedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        isPublished: true,
        views: 78
      }
    ];

    const savedBlogs = await Blog.insertMany(sampleBlogs);
    
    return NextResponse.json({
      message: `${savedBlogs.length} sample blogs created successfully`,
      blogs: savedBlogs
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating sample blogs:', error);
    return NextResponse.json(
      { message: 'Failed to create sample blogs', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
