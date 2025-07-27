# ABSSS Frontend

Frontend application for Al Biruni Society of Scientific Studies (ABSSS) built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern UI/UX** with responsive design
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Server-side rendering** for better SEO
- **Dynamic data fetching** from backend API
- **Contact form** with backend integration
- **Responsive navigation** with mobile menu

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running (see backend README)

## 🛠️ Installation

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the frontend directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── events/            # Events page
│   ├── publications/      # Publications page
│   ├── members/           # Members page
│   ├── contact/           # Contact page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   ├── EventCard.tsx      # Event display card
│   ├── PublicationCard.tsx # Publication display card
│   └── MemberCard.tsx     # Member display card
├── lib/                   # Utility functions
│   └── api.ts            # API integration
├── public/               # Static assets
└── package.json          # Dependencies and scripts
```

## 🎨 Pages

### Home Page (`/`)
- Hero section with society introduction
- Features overview
- Latest events preview
- Recent publications preview
- Call-to-action sections

### About Page (`/about`)
- Mission and vision statements
- Society history timeline
- Core values
- Leadership team information

### Events Page (`/events`)
- List of upcoming events
- Past events archive
- Event categories explanation
- Event submission information

### Publications Page (`/publications`)
- Research papers and articles
- Publication categories
- Submission guidelines
- Publication statistics

### Members Page (`/members`)
- Faculty advisors
- Student members
- Alumni members
- Membership statistics
- Join information

### Contact Page (`/contact`)
- Contact form with backend integration
- Contact information
- Office hours
- FAQ section

## 🧩 Components

### Header Component
- Responsive navigation menu
- Mobile hamburger menu
- Logo and branding
- Navigation links

### Footer Component
- Contact information
- Social media links
- Quick navigation
- Copyright information

### Card Components
- **EventCard**: Displays event information with image, date, location
- **PublicationCard**: Shows publication details with authors, abstract, PDF link
- **MemberCard**: Presents member information with role, department, contact

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS for styling with custom configuration:
- Custom color palette (primary, secondary)
- Custom component classes
- Responsive design utilities

### TypeScript
- Strict type checking enabled
- Custom type definitions for API responses
- Path aliases configured (`@/*`)

### Next.js
- App Router configuration
- Image optimization
- API route handling
- Environment variables

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔌 API Integration

The frontend communicates with the backend API through:
- **API Base URL**: Configurable via environment variables
- **Data Fetching**: Server-side and client-side data fetching
- **Error Handling**: Graceful error handling for API failures
- **Type Safety**: TypeScript interfaces for API responses

### API Endpoints Used
- `GET /api/events` - Fetch events
- `GET /api/events/upcoming` - Fetch upcoming events
- `GET /api/publications` - Fetch publications
- `GET /api/publications/recent` - Fetch recent publications
- `GET /api/members` - Fetch members
- `POST /api/contact` - Submit contact form

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Environment Variables for Production
```env
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
```

## 🧪 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style
- ESLint configuration for code quality
- Prettier for code formatting
- TypeScript strict mode enabled

## 🔗 Backend Integration

This frontend is designed to work with the ABSSS backend API. Make sure the backend is running and accessible before starting the frontend.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License. 