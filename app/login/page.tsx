"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authApi, authStorage } from '@/lib/clientAuth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, LogIn, ShieldCheck } from 'lucide-react';

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
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="section-padding flex flex-1 items-center bg-gradient-to-br from-slate-50 via-white to-primary-50">
        <div className="container-max grid w-full items-center gap-12 lg:grid-cols-[1fr_460px]">
          <section className="hidden lg:block">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white px-4 py-2 text-sm font-bold text-primary-800 shadow-sm">
              <ShieldCheck className="h-4 w-4" />
              Secure member access
            </div>
            <h1 className="max-w-2xl text-5xl font-extrabold leading-tight text-slate-950">
              Welcome back to the ABSSS community.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
              Sign in to manage your profile, save research and courses, and stay
              connected with upcoming scientific activities.
            </p>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-9" aria-labelledby="login-title">
            <div className="mb-7">
              <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-100 text-primary-800">
                <LogIn className="h-6 w-6" />
              </span>
              <h1 id="login-title" className="text-3xl font-extrabold text-slate-950 lg:text-2xl">
                Sign in to your account
              </h1>
              <p className="mt-2 text-slate-600">Use the email address connected to your membership.</p>
            </div>

            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-800" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="form-input"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className="form-input"
                  placeholder="Enter your password"
                />
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full" aria-busy={loading}>
                {loading ? 'Signing in…' : 'Sign in'}
                {!loading && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              New to ABSSS?{' '}
              <Link href="/signup" className="font-bold text-primary-700 hover:text-primary-900">
                Create an account
              </Link>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
