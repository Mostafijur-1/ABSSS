"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authStorage } from '@/lib/clientAuth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  User as UserIcon, 
  Mail, 
  Calendar, 
  Shield, 
  Bookmark, 
  Clock, 
  MapPin, 
  ExternalLink, 
  ArrowRight, 
  Activity, 
  BookOpen, 
  Edit2, 
  CheckCircle,
  FileText,
  BookmarkCheck,
  UserCheck
} from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'bookmarks' | 'rsvps' | 'activities'>('profile');
  
  // Edit Profile States
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ username: '', email: '' });
  const [updateLoading, setUpdateLoading] = useState(false);
  
  // Bookmark filters
  const [bookmarkFilter, setBookmarkFilter] = useState<'all' | 'course' | 'blog' | 'publication'>('all');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = authStorage.getToken();
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch('/api/users/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }

      const data = await response.json();
      setProfile(data);
      setEditForm({
        username: data.username || '',
        email: data.email || ''
      });
    } catch (err: any) {
      setError(err.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateLoading(true);
    setError(null);

    try {
      const token = authStorage.getToken();
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'updateProfile',
          username: editForm.username,
          email: editForm.email
        })
      });

      if (!response.ok) throw new Error('Failed to update profile info');

      const data = await response.json();
      setProfile(data.user);
      authStorage.setUser({
        ...authStorage.getUser()!,
        username: data.user.username,
        email: data.user.email
      });
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleUnbookmark = async (itemId: string, itemType: string) => {
    try {
      const token = authStorage.getToken();
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'toggleBookmark',
          itemId,
          itemType
        })
      });

      if (!response.ok) throw new Error('Failed to remove bookmark');
      const data = await response.json();
      setProfile(data.user);
    } catch (err: any) {
      console.error(err);
      alert('Failed to remove bookmark');
    }
  };

  const handleCancelRSVP = async (eventId: string) => {
    try {
      const token = authStorage.getToken();
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'toggleRSVP',
          eventId
        })
      });

      if (!response.ok) throw new Error('Failed to cancel RSVP');
      const data = await response.json();
      setProfile(data.user);
    } catch (err: any) {
      console.error(err);
      alert('Failed to cancel RSVP');
    }
  };

  const handleLogout = () => {
    authStorage.clear();
    router.push('/');
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading your profile dashboard...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center bg-gray-50 py-12 px-4">
          <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100">
            <Shield className="mx-auto h-12 w-12 text-red-500 mb-4" />
            <p className="text-gray-700 font-medium mb-4">You are not signed in or session has expired.</p>
            <button onClick={() => router.push('/login')} className="btn-primary w-full justify-center">
              Go to Sign In
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const filteredBookmarks = profile.bookmarks?.filter((bm: any) => 
    bookmarkFilter === 'all' ? true : bm.itemType === bookmarkFilter
  ) || [];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Header />

      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Banner and Profile Header */}
          <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-indigo-700 rounded-3xl shadow-xl overflow-hidden mb-8 text-white relative">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
            <div className="p-8 md:p-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-6 relative z-10">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-3xl font-extrabold shadow-inner border border-white/20">
                  {profile.username?.substring(0, 2).toUpperCase()}
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-3xl font-bold tracking-tight">{profile.username}</h1>
                  <p className="text-primary-100/90 text-sm mt-1">{profile.email}</p>
                  <div className="flex items-center justify-center md:justify-start gap-2 mt-3.5">
                    <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
                      {profile.role}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-green-500/30 text-green-200 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm border border-green-500/20">
                      Active Account
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={handleLogout} 
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/25 rounded-xl font-semibold text-sm transition-all duration-200"
              >
                Sign Out
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1 space-y-3">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center px-4 py-3.5 rounded-2xl text-sm font-bold transition-all duration-200 ${
                  activeTab === 'profile'
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/15'
                    : 'bg-white text-gray-700 border border-gray-100 hover:bg-gray-50'
                }`}
              >
                <UserIcon className="w-5 h-5 mr-3" />
                Account Profile
              </button>
              <button
                onClick={() => setActiveTab('bookmarks')}
                className={`w-full flex items-center px-4 py-3.5 rounded-2xl text-sm font-bold transition-all duration-200 ${
                  activeTab === 'bookmarks'
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/15'
                    : 'bg-white text-gray-700 border border-gray-100 hover:bg-gray-50'
                }`}
              >
                <Bookmark className="w-5 h-5 mr-3" />
                Bookmarked Content ({profile.bookmarks?.length || 0})
              </button>
              <button
                onClick={() => setActiveTab('rsvps')}
                className={`w-full flex items-center px-4 py-3.5 rounded-2xl text-sm font-bold transition-all duration-200 ${
                  activeTab === 'rsvps'
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/15'
                    : 'bg-white text-gray-700 border border-gray-100 hover:bg-gray-50'
                }`}
              >
                <Calendar className="w-5 h-5 mr-3" />
                Registered Events ({profile.registeredEvents?.length || 0})
              </button>
              <button
                onClick={() => setActiveTab('activities')}
                className={`w-full flex items-center px-4 py-3.5 rounded-2xl text-sm font-bold transition-all duration-200 ${
                  activeTab === 'activities'
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/15'
                    : 'bg-white text-gray-700 border border-gray-100 hover:bg-gray-50'
                }`}
              >
                <Activity className="w-5 h-5 mr-3" />
                Activity Timeline ({profile.activities?.length || 0})
              </button>
            </div>

            {/* Dashboard Content Panel */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm min-h-[50vh]">
                {error && (
                  <div className="mb-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm">
                    {error}
                  </div>
                )}

                {/* Tab 1: Account Profile */}
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-5">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                        <p className="text-gray-500 text-sm mt-0.5">Manage your account profile details</p>
                      </div>
                      {!isEditing && (
                        <button
                          onClick={() => setIsEditing(true)}
                          className="flex items-center px-4.5 py-2 bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 rounded-xl text-sm font-bold transition-colors"
                        >
                          <Edit2 className="w-4 h-4 mr-2" />
                          Edit Profile
                        </button>
                      )}
                    </div>

                    {isEditing ? (
                      <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-lg">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
                          <input
                            type="text"
                            value={editForm.username}
                            onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                          <input
                            type="email"
                            value={editForm.email}
                            onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                            required
                          />
                        </div>
                        <div className="flex gap-3 pt-3">
                          <button
                            type="submit"
                            disabled={updateLoading}
                            className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-bold disabled:opacity-50"
                          >
                            {updateLoading ? 'Saving...' : 'Save Changes'}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setIsEditing(false);
                              setEditForm({ username: profile.username, email: profile.email });
                            }}
                            className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-bold"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        <div className="bg-gray-50/50 p-4.5 rounded-2xl border border-gray-100">
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Username</p>
                          <p className="text-base font-bold text-gray-900 mt-1">{profile.username}</p>
                        </div>
                        <div className="bg-gray-50/50 p-4.5 rounded-2xl border border-gray-100">
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Address</p>
                          <p className="text-base font-bold text-gray-900 mt-1">{profile.email}</p>
                        </div>
                        <div className="bg-gray-50/50 p-4.5 rounded-2xl border border-gray-100">
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">System Role</p>
                          <p className="text-base font-bold text-gray-900 mt-1 capitalize flex items-center">
                            <Shield className="w-4 h-4 mr-2 text-primary-600" />
                            {profile.role}
                          </p>
                        </div>
                        <div className="bg-gray-50/50 p-4.5 rounded-2xl border border-gray-100">
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Joined Date</p>
                          <p className="text-base font-bold text-gray-900 mt-1 flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-primary-600" />
                            {formatDate(profile.createdAt)}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab 2: Bookmarked Content */}
                {activeTab === 'bookmarks' && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-5">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 font-sans">Bookmarked Content</h2>
                        <p className="text-gray-500 text-sm mt-0.5">Access items you have saved for later</p>
                      </div>
                      
                      {/* Bookmark filter tabs */}
                      <div className="flex flex-wrap gap-1.5 p-1 bg-gray-105 rounded-xl bg-gray-100">
                        {(['all', 'course', 'blog', 'publication'] as const).map((filter) => (
                          <button
                            key={filter}
                            onClick={() => setBookmarkFilter(filter)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors ${
                              bookmarkFilter === filter
                                ? 'bg-white text-primary-800 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                          >
                            {filter}s
                          </button>
                        ))}
                      </div>
                    </div>

                    {filteredBookmarks.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredBookmarks.map((bm: any) => {
                          const details = bm.details || {};
                          return (
                            <div key={bm._id} className="border border-gray-150 rounded-2xl p-5 hover:border-primary-100 flex flex-col bg-white hover:shadow-md transition-all group">
                              <div className="flex items-center justify-between mb-3.5">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider capitalize ${
                                  bm.itemType === 'course' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                                  bm.itemType === 'blog' ? 'bg-orange-50 text-orange-700 border border-orange-100' :
                                  'bg-purple-50 text-purple-700 border border-purple-100'
                                }`}>
                                  {bm.itemType}
                                </span>
                                <button
                                  onClick={() => handleUnbookmark(bm.itemId, bm.itemType)}
                                  className="text-gray-400 hover:text-red-500 transition-colors p-1.5 bg-gray-50 hover:bg-red-50 rounded-lg"
                                  title="Remove Bookmark"
                                >
                                  <BookmarkCheck className="w-4 h-4 fill-current text-primary-600 hover:text-red-500" />
                                </button>
                              </div>

                              <h3 className="text-base font-bold text-gray-900 line-clamp-1 mb-2">
                                {details.title}
                              </h3>
                              <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed mb-4 flex-1">
                                {details.description || details.excerpt || details.abstract || 'No description available.'}
                              </p>

                              <div className="flex items-center justify-between mt-auto border-t border-gray-100 pt-3.5">
                                <span className="text-xs text-gray-400 font-medium">
                                  {details.instructor || details.author || details.authors?.join(', ') || 'ABSSS Listing'}
                                </span>
                                <a
                                  href={
                                    bm.itemType === 'course' ? '/courses' :
                                    bm.itemType === 'blog' ? `/blogs/${bm.itemId}` :
                                    `/publications/${bm.itemId}`
                                  }
                                  className="inline-flex items-center text-primary-600 hover:text-primary-700 text-xs font-bold"
                                >
                                  Open
                                  <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
                                </a>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                        <Bookmark className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <h3 className="text-lg font-bold text-gray-900">No Bookmarks Found</h3>
                        <p className="text-gray-500 text-sm mt-1 max-w-sm mx-auto">
                          You haven't bookmarked any items yet. Explore courses, blogs, or publications and tap bookmark to display them here!
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab 3: Registered Events */}
                {activeTab === 'rsvps' && (
                  <div className="space-y-6">
                    <div className="border-b border-gray-100 pb-5">
                      <h2 className="text-2xl font-bold text-gray-900">Registered Events</h2>
                      <p className="text-gray-500 text-sm mt-0.5">Manage your upcoming event registrations</p>
                    </div>

                    {profile.registeredEvents && profile.registeredEvents.length > 0 ? (
                      <div className="space-y-4">
                        {profile.registeredEvents.map((eventObj: any) => (
                          <div key={eventObj._id} className="border border-gray-150 rounded-2xl p-5 hover:border-primary-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white hover:shadow-sm transition-all group">
                            <div className="flex items-start gap-4">
                              <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-3 flex flex-col items-center justify-center min-w-[70px] text-primary-700 border border-primary-100">
                                <span className="text-xs font-extrabold uppercase tracking-wider">
                                  {new Date(eventObj.date).toLocaleDateString('en-US', { month: 'short' })}
                                </span>
                                <span className="text-xl font-black mt-0.5">
                                  {new Date(eventObj.date).toLocaleDateString('en-US', { day: '2-digit' })}
                                </span>
                              </div>
                              <div>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 capitalize">
                                  {eventObj.category}
                                </span>
                                <h3 className="text-lg font-bold text-gray-900 mt-2 font-sans line-clamp-1">
                                  {eventObj.title}
                                </h3>
                                <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-500 font-medium">
                                  <span className="flex items-center">
                                    <Clock className="w-3.5 h-3.5 mr-1.5 text-primary-500" />
                                    {new Date(eventObj.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                  <span className="flex items-center">
                                    <MapPin className="w-3.5 h-3.5 mr-1.5 text-primary-500" />
                                    {eventObj.location}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 self-end md:self-auto">
                              <a
                                href="/events"
                                className="inline-flex items-center px-4 py-2 text-xs font-bold text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-all"
                              >
                                Details
                              </a>
                              <button
                                onClick={() => handleCancelRSVP(eventObj._id)}
                                className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all shadow-sm shadow-red-600/10"
                              >
                                Cancel RSVP
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                        <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <h3 className="text-lg font-bold text-gray-900">No Registrations Found</h3>
                        <p className="text-gray-500 text-sm mt-1 max-w-sm mx-auto">
                          You haven't RSVP'd to any events yet. Check out the events page and book your seat!
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab 4: Activity Feed */}
                {activeTab === 'activities' && (
                  <div className="space-y-6">
                    <div className="border-b border-gray-100 pb-5">
                      <h2 className="text-2xl font-bold text-gray-900">Activity History</h2>
                      <p className="text-gray-500 text-sm mt-0.5">Timeline of your profile activities</p>
                    </div>

                    {profile.activities && profile.activities.length > 0 ? (
                      <div className="relative pl-6 border-l border-gray-200 space-y-6 pt-2">
                        {profile.activities.slice().reverse().map((act: any) => (
                          <div key={act._id} className="relative">
                            {/* Dot indicator */}
                            <span className="absolute -left-[31px] top-1 bg-white rounded-full p-1 border-2 border-primary-500 shadow-sm flex items-center justify-center">
                              <CheckCircle className="w-3.5 h-3.5 text-primary-500 fill-white" />
                            </span>
                            
                            <div>
                              <p className="text-sm font-semibold text-gray-800 leading-snug">{act.description}</p>
                              <p className="text-xs text-gray-400 mt-1 font-medium flex items-center">
                                <Clock className="w-3.5 h-3.5 mr-1 text-gray-300" />
                                {new Date(act.createdAt).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                        <Activity className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <h3 className="text-lg font-bold text-gray-900">No Activities Yet</h3>
                        <p className="text-gray-500 text-sm mt-1 max-w-sm mx-auto">
                          Your timeline is currently empty. Bookmarking courses, RSVPing to events, or saving research will log timeline events.
                        </p>
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
