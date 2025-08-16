const API_BASE_URL = '/api';

export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  image?: string;
  category: 'conference' | 'workshop' | 'seminar' | 'lecture' | 'competition';
  location: string;
  isUpcoming: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Publication {
  _id: string;
  title: string;
  authors: string[];
  abstract: string;
  pdfUrl: string;
  category: 'research' | 'review' | 'case-study';
  publishedDate: string;
  journal: string;
  createdAt: string;
  updatedAt: string;
}

export interface Blog {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: 'technology' | 'research' | 'events' | 'news' | 'tutorial';
  tags: string[];
  imageUrl?: string;
  publishedDate: string;
  isPublished: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface Member {
  _id: string;
  name: string;
  role: 'faculty' | 'student' | 'alumni';
  designation: string;
  image?: string;
  imageUrl?: string;
  email: string;
  department: string;
  bio: string;
  isActive: boolean;
  joinDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
  subject?: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  role: 'admin' | 'moderator' | 'editor';
  permissions: string[];
  isActive: boolean;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
}

// Generic API function
async function apiCall<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
}

// Generic API function for FormData (file uploads)
async function apiCallFormData<T>(endpoint: string, formData: FormData, method: 'POST' | 'PUT' = 'POST'): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    body: formData,
    // Don't set Content-Type for FormData - browser will set it with boundary
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
}

// Events API
export const eventsApi = {
  getAll: () => apiCall<Event[]>('/events'),
  getUpcoming: () => apiCall<Event[]>('/events/upcoming'),
  getPast: () => apiCall<Event[]>('/events/past'),
  getById: (id: string) => apiCall<Event>(`/events/${id}`),
  create: (event: Omit<Event, '_id' | 'createdAt' | 'updatedAt'>) => 
    apiCall<Event>('/events', { method: 'POST', body: JSON.stringify(event) }),
  createWithFile: (formData: FormData) => 
    apiCallFormData<Event>('/events', formData, 'POST'),
  update: (id: string, event: Partial<Event>) => 
    apiCall<Event>(`/events/${id}`, { method: 'PUT', body: JSON.stringify(event) }),
  updateWithFile: (id: string, formData: FormData) => 
    apiCallFormData<Event>(`/events/${id}`, formData, 'PUT'),
  delete: (id: string) => apiCall<{ message: string }>(`/events/${id}`, { method: 'DELETE' }),
};

// Publications API
export const publicationsApi = {
  getAll: () => apiCall<Publication[]>('/publications'),
  getRecent: () => apiCall<Publication[]>('/publications/recent'),
  getById: (id: string) => apiCall<Publication>(`/publications/${id}`),
  create: (publication: Omit<Publication, '_id' | 'createdAt' | 'updatedAt'>) => 
    apiCall<Publication>('/publications', { method: 'POST', body: JSON.stringify(publication) }),
  createWithFile: (formData: FormData) => 
    apiCallFormData<Publication>('/publications', formData, 'POST'),
  update: (id: string, publication: Partial<Publication>) => 
    apiCall<Publication>(`/publications/${id}`, { method: 'PUT', body: JSON.stringify(publication) }),
  updateWithFile: (id: string, formData: FormData) => 
    apiCallFormData<Publication>(`/publications/${id}`, formData, 'PUT'),
  delete: (id: string) => apiCall<{ message: string }>(`/publications/${id}`, { method: 'DELETE' }),
};

// Blogs API
export const blogsApi = {
  getAll: () => apiCall<Blog[]>('/blogs'),
  getPublished: () => apiCall<Blog[]>('/blogs/published'),
  getRecent: () => apiCall<Blog[]>('/blogs/recent'),
  getByCategory: (category: string) => apiCall<Blog[]>(`/blogs/category/${category}`),
  getById: (id: string) => apiCall<Blog>(`/blogs/${id}`),
  create: (blog: Omit<Blog, '_id' | 'createdAt' | 'updatedAt' | 'views'>) => 
    apiCall<Blog>('/blogs', { method: 'POST', body: JSON.stringify(blog) }),
  createWithFile: (formData: FormData) => 
    apiCallFormData<Blog>('/blogs', formData, 'POST'),
  update: (id: string, blog: Partial<Blog>) => 
    apiCall<Blog>(`/blogs/${id}`, { method: 'PUT', body: JSON.stringify(blog) }),
  updateWithFile: (id: string, formData: FormData) => 
    apiCallFormData<Blog>(`/blogs/${id}`, formData, 'PUT'),
  delete: (id: string) => apiCall<{ message: string }>(`/blogs/${id}`, { method: 'DELETE' }),
  incrementViews: (id: string) => apiCall<Blog>(`/blogs/${id}/view`, { method: 'PATCH' }),
};

// Members API
export const membersApi = {
  getAll: () => apiCall<Member[]>('/members'),
  getFaculty: () => apiCall<Member[]>('/members/faculty'),
  getStudents: () => apiCall<Member[]>('/members/students'),
  getById: (id: string) => apiCall<Member>(`/members/${id}`),
  create: (member: Omit<Member, '_id' | 'createdAt' | 'updatedAt'>) => 
    apiCall<Member>('/members', { method: 'POST', body: JSON.stringify(member) }),
  createWithFile: (formData: FormData) => 
    apiCallFormData<Member>('/members', formData, 'POST'),
  update: (id: string, member: Partial<Member>) => 
    apiCall<Member>(`/members/${id}`, { method: 'PUT', body: JSON.stringify(member) }),
  updateWithFile: (id: string, formData: FormData) => 
    apiCallFormData<Member>(`/members/${id}`, formData, 'PUT'),
  delete: (id: string) => apiCall<{ message: string }>(`/members/${id}`, { method: 'DELETE' }),
};

// Contact API
export const contactApi = {
  submit: (contact: ContactForm) => 
    apiCall<{ message: string; contact: any }>('/contact', { method: 'POST', body: JSON.stringify(contact) }),
};

// Users API
export const usersApi = {
  getAll: () => apiCall<User[]>('/users'),
  getById: (id: string) => apiCall<User>(`/users/${id}`),
  create: (user: Omit<User, '_id' | 'createdAt' | 'updatedAt' | 'lastLogin'>) => 
    apiCall<User>('/users', { method: 'POST', body: JSON.stringify(user) }),
  update: (id: string, user: Partial<User>) => 
    apiCall<User>(`/users/${id}`, { method: 'PUT', body: JSON.stringify(user) }),
  delete: (id: string) => apiCall<{ message: string }>(`/users/${id}`, { method: 'DELETE' }),
  toggleStatus: (id: string) => apiCall<User>(`/users/${id}`, { method: 'PATCH' }),
}; 