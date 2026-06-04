"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authStorage } from '@/lib/clientAuth';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Signup failed');

      // If token returned, sign the user in
      if (data.token) {
        authStorage.setToken(data.token);
        authStorage.setUser(data.user);
        const role = data.user?.role;
        const redirect = role === 'admin' || role === 'moderator' ? '/admin' : '/profile';
        router.push(redirect);
        return;
      }

      // Otherwise inform user about pending activation
      setMessage(data.message || 'Signup received — pending admin activation');
      setForm({ username: '', email: '', password: '' });
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Create an account</h2>

        {error && <div className="mb-3 text-sm text-red-700">{error}</div>}
        {message && <div className="mb-3 text-sm text-green-700">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input id="username" name="username" value={form.username} onChange={handleChange} required minLength={3}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input id="password" name="password" type="password" value={form.password} onChange={handleChange} required minLength={6}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="flex items-center justify-between">
            <button type="submit" disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
              {loading ? 'Creating...' : 'Sign up'}
            </button>
            <Link href="/login" className="text-sm text-blue-600 hover:underline">Already have an account?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
