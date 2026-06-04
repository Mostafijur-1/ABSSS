"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authStorage } from '@/lib/clientAuth';
import Link from 'next/link';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(authStorage.getUser());
  }, []);

  const handleLogout = () => {
    authStorage.clear();
    router.push('/');
  };

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-700">You are not signed in.</p>
          <div className="mt-4">
            <Link href="/login" className="text-blue-600 hover:underline">Sign in</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Profile</h1>
          <button onClick={handleLogout} className="px-3 py-1 bg-red-600 text-white rounded-md">Logout</button>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Username</p>
            <p className="text-lg font-medium text-gray-900">{user.username}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-medium text-gray-900">{user.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Role</p>
            <p className="text-lg font-medium text-gray-900 capitalize">{user.role}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Permissions</p>
            <p className="text-lg font-medium text-gray-900">{(user.permissions || []).join(', ') || 'None'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
