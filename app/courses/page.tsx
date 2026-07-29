"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { coursesApi, Course } from '@/lib/api';
import { BookOpen, Calendar, Clock, User, Search, Award, Sparkles, Bookmark } from 'lucide-react';
import { authStorage } from '@/lib/clientAuth';

export default function CoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'completed' | 'ongoing'>('all');
  const [user, setUser] = useState<any>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  useEffect(() => {
    const loadUser = async () => {
      const userData = authStorage.getUser();
      setUser(userData);
      
      if (userData && userData.role === 'student') {
        try {
          const token = authStorage.getToken();
          const res = await fetch('/api/users/profile', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.ok) {
            const data = await res.json();
            if (data.bookmarks) {
              const courseBookmarks = data.bookmarks
                .filter((b: any) => b.itemType === 'course')
                .map((b: any) => b.itemId);
              setBookmarkedIds(courseBookmarks);
            }
          }
        } catch (e) {
          console.error('Failed to load bookmarks', e);
        }
      }
    };
    loadUser();
  }, []);

  const handleToggleBookmark = async (courseId: string) => {
    if (!user) {
      router.push('/login');
      return;
    }
    
    try {
      const token = authStorage.getToken();
      const res = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'toggleBookmark',
          itemId: courseId,
          itemType: 'course'
        })
      });
      
      if (res.ok) {
        if (bookmarkedIds.includes(courseId)) {
          setBookmarkedIds(bookmarkedIds.filter(id => id !== courseId));
        } else {
          setBookmarkedIds([...bookmarkedIds, courseId]);
        }
      }
    } catch (err) {
      console.error('Failed to toggle bookmark', err);
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await coursesApi.getAll();
        setCourses(data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'TBA';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'ongoing':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'completed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (course.instructor && course.instructor.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesTab = activeTab === 'all' || course.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white overflow-hidden py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        </div>
        
        <div className="container-max relative z-10 text-center">
          <div className="inline-flex items-center gap-2 mb-4 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
            <Sparkles className="h-4 w-4 text-primary-200 animate-pulse" />
            <span className="text-sm text-primary-100 font-medium">Academic Enrichment</span>
          </div>
          <h1 className="mb-5 text-4xl font-bold sm:text-5xl">Scientific & Research Courses</h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
            Enhance your scientific inquiry, methodology, and research capabilities through our specialized courses led by expert mentors.
          </p>
        </div>
      </section>

      {/* Courses Main Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          
          {/* Search and Tabs */}
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-center mb-12 bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm">
            {/* Tabs */}
            <div className="flex gap-2 p-1.5 bg-gray-200/60 rounded-xl w-full lg:w-auto">
              {(['all', 'upcoming', 'ongoing', 'completed'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  aria-pressed={activeTab === tab}
                  className={`flex-1 lg:flex-initial px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 active:scale-95 ${
                    activeTab === tab
                      ? 'bg-white text-primary-800 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/40'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} Courses
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                aria-label="Search courses"
                placeholder="Search courses, instructors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <div key={course._id} className="card overflow-hidden group h-full flex flex-col hover:border-primary-100 border border-gray-100">
                  {/* Course Image */}
                  <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    {course.image ? (
                      <img
                        src={course.image}
                        alt={course.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
                        <BookOpen className="w-16 h-16 text-primary-200" />
                      </div>
                    )}
                    {/* Status Badge */}
                    <span className={`absolute top-4 right-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(course.status)}`}>
                      {course.status.toUpperCase()}
                    </span>
                    {/* Bookmark Button */}
                    {user && user.role === 'student' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleBookmark(course._id);
                        }}
                        className="absolute top-4 left-4 p-2 bg-white/80 hover:bg-white text-primary-600 rounded-full shadow-md backdrop-blur-sm transition-all duration-200 z-10"
                        aria-label={bookmarkedIds.includes(course._id) ? `Remove ${course.title} from bookmarks` : `Bookmark ${course.title}`}
                        aria-pressed={bookmarkedIds.includes(course._id)}
                      >
                        <Bookmark className={`w-4 h-4 ${bookmarkedIds.includes(course._id) ? 'fill-current text-primary-600' : 'text-gray-400'}`} />
                      </button>
                    )}
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-1">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 mb-6 text-sm line-clamp-3 leading-relaxed flex-1">
                      {course.description}
                    </p>

                    <div className="space-y-3.5 border-t border-gray-100 pt-5 mt-auto text-sm text-gray-600">
                      {course.instructor && (
                        <div className="flex items-center font-medium">
                          <User className="h-4 w-4 mr-3 text-primary-600 flex-shrink-0" />
                          <span className="truncate">Instructor: <span className="text-gray-900 font-semibold">{course.instructor}</span></span>
                        </div>
                      )}
                      
                      {course.duration && (
                        <div className="flex items-center font-medium">
                          <Clock className="w-4 h-4 mr-3 text-primary-600 flex-shrink-0" />
                          <span>Duration: <span className="text-gray-900 font-semibold">{course.duration}</span></span>
                        </div>
                      )}

                      <div className="flex items-center font-medium">
                        <Calendar className="w-4 h-4 mr-3 text-primary-600 flex-shrink-0" />
                        {course.status === 'completed' ? (
                          <span>Ended: <span className="text-gray-900 font-semibold">{formatDate(course.endDate)}</span></span>
                        ) : (
                          <span>Starts: <span className="text-gray-900 font-semibold">{formatDate(course.startDate)}</span></span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Courses Found</h3>
              <p className="text-gray-600">
                {searchTerm || activeTab !== 'all'
                  ? 'Try clearing your search or checking other tabs.'
                  : 'Check back later for newly scheduled courses.'}
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
