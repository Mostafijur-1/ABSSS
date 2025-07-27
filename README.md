# ABSSS - Al Biruni Society of Scientific Studies

A comprehensive full-stack web application for managing a university-based scientific society, featuring both public-facing content and a powerful admin dashboard.

## 🚀 **Features**

### **Public Website**
- **Home Page** - Hero section, latest events, publications preview
- **About Page** - Mission, vision, history, and values
- **Events Page** - Upcoming and past events with filtering
- **Publications Page** - Research articles and papers
- **Members Page** - Faculty advisors, students, and alumni
- **Contact Page** - Contact form and information

### **Admin Dashboard** 🆕
- **Authentication System** - Secure login with role-based access
- **Dashboard Overview** - Statistics, analytics, and system health
- **Events Management** - CRUD operations for events
- **Publications Management** - Manage research papers and articles
- **Members Management** - Handle society members and roles
- **Contact Management** - View and respond to messages
- **User Management** - Admin and moderator accounts
- **Analytics** - Detailed insights and reporting

## 🏗️ **Architecture**

### **Frontend**
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Component-based** architecture
- **Responsive design** for all devices

### **Backend**
- **Express.js** REST API
- **MongoDB** with Mongoose ODM
- **JWT Authentication** with role-based permissions
- **MVC Pattern** (Models, Routes, Controllers)
- **CORS** enabled for frontend integration

## 📊 **Database Models**

1. **Event** - title, description, date, location, category, image, isUpcoming
2. **Publication** - title, authors, abstract, pdfUrl, category, journal, publishedDate
3. **Member** - name, role, designation, email, department, bio, image, isActive
4. **Contact** - name, email, subject, message, isRead
5. **User** - username, email, password, role, permissions, isActive

## 🔐 **Authentication & Authorization**

### **User Roles**
- **Admin** - Full access to all features
- **Moderator** - Limited access based on permissions

### **Permissions**
- `events` - Manage events
- `publications` - Manage publications  
- `members` - Manage members
- `contacts` - View contact messages
- `users` - Manage user accounts (admin only)

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 18+ and npm
- MongoDB (local or cloud)

### **Backend Setup**
```bash
cd backend
npm install
# Create .env file with MongoDB URI
echo "MONGODB_URI=mongodb://localhost:27017/absss" > .env
echo "JWT_SECRET=your-secret-key" >> .env
npm run seed  # Populate with sample data
npm run dev   # Start server on port 5000
```

### **Frontend Setup**
```bash
cd frontend
npm install
# Create .env.local with API URL
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local
npm run dev   # Start on port 3000
```

## 🔑 **Default Admin Credentials**

### **Admin Account**
- **Username:** `admin`
- **Password:** `admin123`
- **Role:** Full administrator access

### **Moderator Account**
- **Username:** `moderator`
- **Password:** `moderator123`
- **Role:** Limited permissions

## 📱 **Access URLs**

- **Public Website:** `http://localhost:3000`
- **Admin Dashboard:** `http://localhost:3000/admin/login`
- **Backend API:** `http://localhost:5000/api`

## 🛠️ **API Endpoints**

### **Public Endpoints**
- `GET /api/events` - Get all events
- `GET /api/publications` - Get all publications
- `GET /api/members` - Get all members
- `POST /api/contact` - Submit contact form

### **Admin Endpoints** (Require Authentication)
- `POST /api/auth/login` - Admin login
- `GET /api/dashboard/stats` - Dashboard statistics
- `GET /api/auth/users` - Get all users (admin only)
- `POST /api/events` - Create event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event
- And many more CRUD operations...

## 📁 **Project Structure**

```
absss/
├── backend/                 # Express.js + MongoDB API
│   ├── config/             # Database configuration
│   ├── controllers/        # API controllers
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Authentication middleware
│   ├── scripts/           # Database seeding
│   └── server.js          # Main server file
├── frontend/               # Next.js 14 + TypeScript
│   ├── app/               # App Router pages
│   │   ├── admin/         # Admin dashboard pages
│   │   └── ...            # Public pages
│   ├── components/        # React components
│   │   ├── admin/         # Admin-specific components
│   │   └── ...            # Public components
│   ├── lib/              # API integration & auth
│   └── ...               # Configuration files
└── README.md             # This file
```

## 🎨 **Admin Dashboard Features**

### **Dashboard Overview**
- Real-time statistics and metrics
- Recent activity feeds
- Quick action buttons
- System health monitoring

### **Content Management**
- **Events:** Create, edit, delete events with rich text editor
- **Publications:** Manage research papers with file uploads
- **Members:** Handle member profiles and roles
- **Messages:** View and respond to contact form submissions

### **User Management**
- Create and manage admin/moderator accounts
- Role-based permission system
- User activity tracking
- Password management

### **Analytics & Reporting**
- Monthly activity charts
- Category distribution analysis
- User engagement metrics
- System performance monitoring

## 🔧 **Configuration**

### **Environment Variables**

**Backend (.env)**
```env
MONGODB_URI=mongodb://localhost:27017/absss
JWT_SECRET=your-secret-key
PORT=5000
NODE_ENV=development
```

**Frontend (.env.local)**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 🚀 **Deployment**

### **Backend Deployment**
1. Set up MongoDB (Atlas or local)
2. Configure environment variables
3. Deploy to Heroku, Vercel, or your preferred platform
4. Run database seeding

### **Frontend Deployment**
1. Update API URL in environment variables
2. Build the application: `npm run build`
3. Deploy to Vercel, Netlify, or your preferred platform

## 🧪 **Testing**

### **Backend Testing**
```bash
cd backend
npm test
```

### **Frontend Testing**
```bash
cd frontend
npm test
```

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 **License**

This project is licensed under the MIT License.

## 🆘 **Support**

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation in `/docs` folder

## 🔄 **Updates & Maintenance**

### **Regular Maintenance**
- Update dependencies regularly
- Monitor system logs
- Backup database regularly
- Review and update security measures

### **Feature Updates**
- Admin dashboard enhancements
- New content management features
- Improved analytics and reporting
- Enhanced user experience

---

**Built with ❤️ for the Al Biruni Society of Scientific Studies**
