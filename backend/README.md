# ABSSS Backend API

Backend API for Al Biruni Society of Scientific Studies (ABSSS) built with Node.js, Express, and MongoDB.

## 🚀 Features

- **RESTful API** with Express.js
- **MongoDB** database with Mongoose ODM
- **CRUD operations** for Events, Publications, Members, and Contact
- **CORS enabled** for frontend integration
- **Error handling** and validation
- **Database seeding** with sample data

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## 🛠️ Installation

1. **Clone and navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/absss
   NODE_ENV=development
   ```

4. **Start MongoDB:**
   Make sure MongoDB is running on your system.

5. **Seed the database (optional):**
   ```bash
   npm run seed
   ```

6. **Start the server:**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:5000`

## 📚 API Endpoints

### Events
- `GET /api/events` - Get all events
- `GET /api/events/upcoming` - Get upcoming events
- `GET /api/events/past` - Get past events
- `POST /api/events` - Create new event
- `GET /api/events/:id` - Get single event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Publications
- `GET /api/publications` - Get all publications
- `GET /api/publications/recent` - Get recent publications
- `POST /api/publications` - Create new publication
- `GET /api/publications/:id` - Get single publication
- `PUT /api/publications/:id` - Update publication
- `DELETE /api/publications/:id` - Delete publication

### Members
- `GET /api/members` - Get all members
- `GET /api/members/faculty` - Get faculty members
- `GET /api/members/students` - Get student members
- `POST /api/members` - Create new member
- `GET /api/members/:id` - Get single member
- `PUT /api/members/:id` - Update member
- `DELETE /api/members/:id` - Delete member

### Contact
- `GET /api/contact` - Get all contact messages (admin)
- `POST /api/contact` - Submit contact form
- `GET /api/contact/:id` - Get single contact message
- `PUT /api/contact/:id/read` - Mark as read
- `DELETE /api/contact/:id` - Delete contact message

### Health Check
- `GET /api/health` - API health status

## 🗄️ Database Models

### Event
```javascript
{
  title: String (required),
  description: String (required),
  date: Date (required),
  image: String,
  category: String (enum: conference, workshop, seminar, lecture, competition),
  location: String,
  isUpcoming: Boolean
}
```

### Publication
```javascript
{
  title: String (required),
  authors: [String] (required),
  abstract: String (required),
  pdfUrl: String (required),
  category: String (enum: research, review, case-study, blog),
  publishedDate: Date,
  journal: String
}
```

### Member
```javascript
{
  name: String (required),
  role: String (enum: faculty, student, alumni),
  designation: String (required),
  image: String,
  email: String (required, unique),
  department: String,
  bio: String,
  isActive: Boolean,
  joinDate: Date
}
```

### Contact
```javascript
{
  name: String (required),
  email: String (required),
  message: String (required),
  subject: String,
  isRead: Boolean
}
```

## 🧪 Testing the API

You can test the API using tools like Postman, curl, or any HTTP client:

```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Get all events
curl http://localhost:5000/api/events

# Create a new event
curl -X POST http://localhost:5000/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Event",
    "description": "Test description",
    "date": "2024-12-31",
    "category": "seminar"
  }'
```

## 📝 Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with sample data

## 🔧 Configuration

The application uses environment variables for configuration:

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `NODE_ENV` - Environment (development/production)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License. 