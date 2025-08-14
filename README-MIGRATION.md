# ABSSS Website - Next.js Full Stack Migration

This project has been migrated from a separate Express.js backend + Next.js frontend to a fully integrated Next.js application with API routes.

## 🚀 What's Changed

### Before (Separate Backend + Frontend)
- Express.js backend running on port 5000
- Next.js frontend running on port 3000
- Separate package.json files and dependencies
- Cross-origin requests between frontend and backend

### After (Full Next.js Stack)
- Single Next.js application with API routes
- All backend functionality moved to `/app/api/` routes
- Unified package.json with all dependencies
- No cross-origin issues
- Better performance and deployment simplicity

## 📁 New Structure

```
frontend/
├── app/
│   ├── api/                    # API Routes (replaces Express backend)
│   │   ├── auth/
│   │   │   └── login/
│   │   │       └── route.ts
│   │   ├── blogs/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   ├── events/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   ├── members/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   ├── publications/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   └── contact/
│   │       └── route.ts
│   └── ... (existing pages)
├── lib/
│   ├── database.ts             # MongoDB connection
│   ├── auth.ts                 # Server-side auth utilities
│   ├── clientAuth.ts           # Client-side auth utilities
│   ├── api.ts                  # Updated API client
│   └── models/                 # Mongoose models
│       ├── Event.ts
│       ├── Blog.ts
│       ├── Member.ts
│       ├── Publication.ts
│       ├── Contact.ts
│       └── User.ts
```

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Environment Variables

Copy the example environment file and configure it:

```bash
cp env.example .env.local
```

Edit `.env.local` with your actual values:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/absss

# JWT Secret (generate a strong secret for production)
JWT_SECRET=your-super-secret-jwt-key-here

# Cloudinary (optional - for file uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 3. Database Setup

Make sure MongoDB is running and accessible. The application will automatically create the necessary collections when you first use them.

### 4. Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🔄 API Changes

### Before (External API)
```typescript
const API_BASE_URL = 'http://localhost:5000/api';
```

### After (Internal API Routes)
```typescript
const API_BASE_URL = '/api';
```

All API calls now use relative URLs and are handled by Next.js API routes.

## 📊 Database Models

All Mongoose models have been migrated with:
- Proper TypeScript interfaces
- Validation rules
- Database indexes for performance
- Timestamps

## 🔐 Authentication

- JWT-based authentication
- Server-side token verification
- Client-side token storage
- Role-based access control

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Other Platforms
- Set `MONGODB_URI` to your production MongoDB instance
- Set `JWT_SECRET` to a strong secret
- Build and deploy as a standard Next.js application

## 🔧 Development

### Adding New API Routes
1. Create a new file in `app/api/`
2. Export HTTP methods (GET, POST, PUT, DELETE)
3. Use the database connection and models

### Adding New Models
1. Create a new model in `lib/models/`
2. Define schema with validation
3. Add to API routes as needed

## 📝 Notes

- The backend folder can now be removed as all functionality is in the frontend
- All API routes are now serverless functions
- Better performance with no cross-origin requests
- Simplified deployment and maintenance
- TypeScript support throughout the stack

## 🐛 Troubleshooting

### Database Connection Issues
- Check `MONGODB_URI` in `.env.local`
- Ensure MongoDB is running
- Check network connectivity

### Authentication Issues
- Verify `JWT_SECRET` is set
- Check token expiration
- Ensure proper role permissions

### API Route Issues
- Check file structure in `app/api/`
- Verify HTTP method exports
- Check console for error messages
