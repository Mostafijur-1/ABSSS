"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, UserPlus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { authStorage } from "@/lib/clientAuth";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Signup failed");

      if (data.token) {
        authStorage.setToken(data.token);
        authStorage.setUser(data.user);
        const role = data.user?.role;
        const redirect = ["admin", "moderator", "editor"].includes(role)
          ? "/admin"
          : "/profile";
        router.push(redirect);
        return;
      }

      setMessage(data.message || "Signup received — pending admin activation");
      setForm({ username: "", email: "", password: "" });
    } catch (caughtError: any) {
      setError(caughtError.message || "Signup failed");
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
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white px-4 py-2 text-sm font-bold text-primary-800 shadow-sm">
              <CheckCircle2 className="h-4 w-4" />
              Membership starts here
            </span>
            <h1 className="max-w-2xl text-5xl font-extrabold leading-tight text-slate-950">
              Grow your scientific network and your ideas.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
              Create an account to follow courses, bookmark publications, connect
              with events, and participate in the ABSSS research community.
            </p>
          </section>

          <section
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-9"
            aria-labelledby="signup-title"
          >
            <div className="mb-7">
              <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-100 text-primary-800">
                <UserPlus className="h-6 w-6" />
              </span>
              <h1 id="signup-title" className="text-3xl font-extrabold text-slate-950 lg:text-2xl">
                Create your account
              </h1>
              <p className="mt-2 text-slate-600">Join the ABSSS member community in a few steps.</p>
            </div>

            {error && (
              <div
                className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-800"
                role="alert"
              >
                {error}
              </div>
            )}
            {message && (
              <div
                className="mb-5 rounded-xl border border-green-200 bg-green-50 p-3 text-sm font-medium text-green-800"
                role="status"
                aria-live="polite"
              >
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  id="username"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  required
                  minLength={3}
                  autoComplete="username"
                  className="form-input"
                  placeholder="Choose a username"
                />
              </div>

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
                  minLength={6}
                  autoComplete="new-password"
                  className="form-input"
                  placeholder="At least 6 characters"
                  aria-describedby="password-help"
                />
                <p id="password-help" className="mt-2 text-xs text-slate-500">
                  Use six or more characters.
                </p>
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full" aria-busy={loading}>
                {loading ? "Creating account…" : "Create account"}
                {!loading && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-primary-700 hover:text-primary-900">
                Sign in
              </Link>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
