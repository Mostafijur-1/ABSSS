const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

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
  category: 'research' | 'review' | 'case-study' | 'blog';
  publishedDate: string;
  journal: string;
  createdAt: string;
  updatedAt: string;
}

export interface Member {
  _id: string;
  name: string;
  role: 'faculty' | 'student' | 'alumni';
  designation: string;
  image?: string;
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

// Events API
export const eventsApi = {
  getAll: () => apiCall<Event[]>('/events'),
  getUpcoming: () => apiCall<Event[]>('/events/upcoming'),
  getPast: () => apiCall<Event[]>('/events/past'),
  getById: (id: string) => apiCall<Event>(`/events/${id}`),
  create: (event: Omit<Event, '_id' | 'createdAt' | 'updatedAt'>) => 
    apiCall<Event>('/events', { method: 'POST', body: JSON.stringify(event) }),
  update: (id: string, event: Partial<Event>) => 
    apiCall<Event>(`/events/${id}`, { method: 'PUT', body: JSON.stringify(event) }),
  delete: (id: string) => apiCall<{ message: string }>(`/events/${id}`, { method: 'DELETE' }),
};

// Publications API
export const publicationsApi = {
  getAll: () => apiCall<Publication[]>('/publications'),
  getRecent: () => apiCall<Publication[]>('/publications/recent'),
  getById: (id: string) => apiCall<Publication>(`/publications/${id}`),
  create: (publication: Omit<Publication, '_id' | 'createdAt' | 'updatedAt'>) => 
    apiCall<Publication>('/publications', { method: 'POST', body: JSON.stringify(publication) }),
  update: (id: string, publication: Partial<Publication>) => 
    apiCall<Publication>(`/publications/${id}`, { method: 'PUT', body: JSON.stringify(publication) }),
  delete: (id: string) => apiCall<{ message: string }>(`/publications/${id}`, { method: 'DELETE' }),
};

// Members API
export const membersApi = {
  getAll: () => apiCall<Member[]>('/members'),
  getFaculty: () => apiCall<Member[]>('/members/faculty'),
  getStudents: () => apiCall<Member[]>('/members/students'),
  getById: (id: string) => apiCall<Member>(`/members/${id}`),
  create: (member: Omit<Member, '_id' | 'createdAt' | 'updatedAt'>) => 
    apiCall<Member>('/members', { method: 'POST', body: JSON.stringify(member) }),
  update: (id: string, member: Partial<Member>) => 
    apiCall<Member>(`/members/${id}`, { method: 'PUT', body: JSON.stringify(member) }),
  delete: (id: string) => apiCall<{ message: string }>(`/members/${id}`, { method: 'DELETE' }),
};

// Contact API
export const contactApi = {
  submit: (contact: ContactForm) => 
    apiCall<{ message: string; contact: any }>('/contact', { method: 'POST', body: JSON.stringify(contact) }),
}; 