import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/database';
import Blog from '@/lib/models/Blog';
import { getAuthErrorStatus, requirePermission } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    console.log('GET /api/blogs called - headers:', {
      referer: request.headers.get('referer'),
      origin: request.headers.get('origin'),
      ua: request.headers.get('user-agent')
    });
    const urlObj = new URL(request.url);
    console.log('GET /api/blogs searchParams:', urlObj.searchParams.toString());
    const mongooseConn = await connectDB();
    try {
      const db = mongooseConn?.connection?.db;
      if (db) {
        const collections = await db.listCollections().toArray();
        console.log('Connected DB name:', mongooseConn.connection.name, 'collections:', collections.map(c => c.name));
      } else {
        console.warn('No db object on mongoose connection; cannot list collections.');
      }
    } catch (e) {
      if (e instanceof Error) {
        console.warn('Could not list collections:', e.message);
      } else {
        console.warn('Could not list collections:', String(e));
      }
    }
    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published');
    const category = searchParams.get('category');
    const recent = searchParams.get('recent');

    // Build query object progressively
    const query: any = {};
    if (published === 'true') query.isPublished = true;
    if (category) query.category = category;

    // Sorting and optional limit for "recent" flag
    const sortOptions: any = { publishedDate: -1 };
    let limit: number | undefined = undefined;
    if (recent === 'true') limit = 5;

    const blogs = await Blog.find(query)
      .sort(sortOptions)
      .limit(limit || 0);

    console.log('GET /api/blogs query:', query, 'count:', Array.isArray(blogs) ? blogs.length : 0);
    if (Array.isArray(blogs) && blogs.length > 0) {
      console.log('GET /api/blogs sample:', blogs.slice(0, 2).map(b => ({ _id: b._id, title: b.title, isPublished: b.isPublished })));
    }

    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { message: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    requirePermission(request, 'publications');
    await connectDB();

    // Guard against multipart/form-data requests (FormData). The route
    // expects JSON. If a client is sending FormData (e.g. with files),
    // instruct them to upload files via /api/upload/image first and then
    // POST JSON to this endpoint.
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      return NextResponse.json(
        { message: 'Unsupported content-type multipart/form-data. Upload images to /api/upload/image first and send JSON to /api/blogs.' },
        { status: 415 }
      );
    }

    const body = await request.json();

    const blog = new Blog(body);
    const savedBlog = await blog.save();

    return NextResponse.json(savedBlog, { status: 201 });
  } catch (error) {
    console.error('Error creating blog:', error);
    if (error instanceof Error && ['Authentication required', 'Insufficient permissions'].includes(error.message)) {
      return NextResponse.json({ message: error.message }, { status: getAuthErrorStatus(error) });
    }

    // If Mongoose validation failed, return details to the client to
    // help diagnose missing/invalid fields instead of a generic 500.
    if (error && (error as any).name === 'ValidationError') {
      const errs: Record<string, string> = {};
      for (const key of Object.keys((error as any).errors || {})) {
        errs[key] = (error as any).errors[key].message;
      }
      return NextResponse.json({ message: 'Validation failed', errors: errs }, { status: 400 });
    }

    return NextResponse.json(
      { message: 'Failed to create blog', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
