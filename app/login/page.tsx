"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authApi, authStorage } from '@/lib/clientAuth';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await authApi.login({ email: form.email, password: form.password });
      if (data.token) {
        authStorage.setToken(data.token);
        authStorage.setUser(data.user);
        const role = data.user?.role;
        const redirect = ['admin', 'moderator', 'editor'].includes(role) ? '/admin' : '/profile';
        router.push(redirect);
      } else {
        setError('Login failed: no token returned');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Sign in to your account</h2>

        {error && <div className="mb-3 text-sm text-red-700">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input id="password" name="password" type="password" value={form.password} onChange={handleChange} required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="flex items-center justify-between">
            <button type="submit" disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
            <Link href="/signup" className="text-sm text-blue-600 hover:underline">Create an account</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
