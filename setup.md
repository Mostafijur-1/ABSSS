# ABSSS Project Setup Guide

This guide will help you set up and run the complete ABSSS (Al Biruni Society of Scientific Studies) project.

## 🚀 Quick Setup

### Prerequisites
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (local or cloud instance) - [Download here](https://www.mongodb.com/try/download/community)
- **Git** - [Download here](https://git-scm.com/)

### Step 1: Clone and Navigate
```bash
# Clone the repository (if using git)
git clone <repository-url>
cd absss

# Or if you have the files locally, just navigate to the project directory
cd absss
```

### Step 2: Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
echo "PORT=5000
MONGODB_URI=mongodb://localhost:27017/absss
NODE_ENV=development" > .env

# Start MongoDB (if running locally)
# On Windows: Start MongoDB service
# On macOS: brew services start mongodb-community
# On Linux: sudo systemctl start mongod

# Seed the database with sample data
npm run seed

# Start the backend server
npm run dev
```

**Backend should now be running at:** `http://localhost:5000`

### Step 3: Frontend Setup
```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local

# Start the frontend development server
npm run dev
```

**Frontend should now be running at:** `http://localhost:3000`

## 🧪 Testing the Setup

### 1. Test Backend API
Open your browser or use curl to test the backend:

```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Should return: {"message":"ABSSS API is running!","timestamp":"..."}
```

### 2. Test Frontend
Open your browser and go to `http://localhost:3000`

You should see:
- ✅ Home page with hero section
- ✅ Navigation menu
- ✅ Sample events and publications
- ✅ Working contact form

### 3. Test Database
The database should be populated with sample data:
- 4 sample events
- 4 sample publications  
- 6 sample members

## 📁 Project Structure

```
absss/
├── backend/                 # Express.js API
│   ├── config/             # Database config
│   ├── controllers/        # API controllers
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── scripts/           # Database seeding
│   ├── server.js          # Main server file
│   └── package.json       # Backend dependencies
├── frontend/               # Next.js application
│   ├── app/               # App Router pages
│   ├── components/        # React components
│   ├── lib/              # Utility functions
│   ├── next.config.js    # Next.js config
│   └── package.json      # Frontend dependencies
└── README.md             # Main documentation
```

## 🔧 Configuration

### Backend Environment Variables (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/absss
NODE_ENV=development
```

### Frontend Environment Variables (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 🎯 Available Scripts

### Backend Scripts
```bash
cd backend
npm run dev      # Start development server
npm run seed     # Seed database with sample data
npm start        # Start production server
```

### Frontend Scripts
```bash
cd frontend
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 🌐 Accessing the Application

### Frontend Pages
- **Home**: `http://localhost:3000/`
- **About**: `http://localhost:3000/about`
- **Events**: `http://localhost:3000/events`
- **Publications**: `http://localhost:3000/publications`
- **Members**: `http://localhost:3000/members`
- **Contact**: `http://localhost:3000/contact`

### Backend API Endpoints
- **Health Check**: `http://localhost:5000/api/health`
- **Events**: `http://localhost:5000/api/events`
- **Publications**: `http://localhost:5000/api/publications`
- **Members**: `http://localhost:5000/api/members`
- **Contact**: `http://localhost:5000/api/contact`

## 🐛 Troubleshooting

### Common Issues

#### 1. MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Make sure MongoDB is running
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

#### 2. Port Already in Use
```
Error: listen EADDRINUSE :::5000
```
**Solution**: Change the port in backend/.env
```env
PORT=5001
```

#### 3. Frontend Can't Connect to Backend
**Solution**: Check the API URL in frontend/.env.local
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

#### 4. Module Not Found Errors
**Solution**: Reinstall dependencies
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Getting Help

If you encounter any issues:

1. Check the console for error messages
2. Verify all prerequisites are installed
3. Ensure MongoDB is running
4. Check environment variables are set correctly
5. Try restarting both servers

## 🚀 Next Steps

Once the application is running:

1. **Explore the Features**:
   - Browse events and publications
   - Test the contact form
   - View member profiles

2. **Customize the Content**:
   - Update the sample data in `backend/scripts/seed.js`
   - Modify the frontend content in the page components
   - Add your own events and publications

3. **Deploy to Production**:
   - Set up a production MongoDB instance
   - Configure environment variables for production
   - Deploy backend to a hosting service
   - Deploy frontend to Vercel or similar

## 📞 Support

For additional help:
- Check the main README.md for detailed documentation
- Review the API documentation in backend/README.md
- Check the frontend documentation in frontend/README.md

---

**Happy coding! 🎉** 