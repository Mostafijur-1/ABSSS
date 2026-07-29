"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  UserRound,
} from "lucide-react";
import { GraduationCap, Menu, X } from "./Icons";
import { authStorage } from "@/lib/clientAuth";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Courses", href: "/courses" },
  { name: "Events", href: "/events" },
  { name: "Publications", href: "/publications" },
  { name: "Blog", href: "/blogs" },
  { name: "Members", href: "/members" },
  { name: "Contact", href: "/contact" },
];

const canManage = (role?: string) =>
  Boolean(role && ["admin", "moderator", "editor"].includes(role));

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadUser = () => setUser(authStorage.getUser());
    loadUser();
    window.addEventListener("storage", loadUser);
    window.addEventListener("authChanged", loadUser as EventListener);
    return () => {
      window.removeEventListener("storage", loadUser);
      window.removeEventListener("authChanged", loadUser as EventListener);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleLogout = () => {
    authStorage.clear();
    setUser(null);
    setIsMenuOpen(false);
    router.push("/");
  };

  const items = canManage(user?.role)
    ? [...navigation, { name: "Dashboard", href: "/admin" }]
    : navigation;

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-xl">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="flex h-[72px] items-center justify-between gap-4">
            <Link
              href="/"
              className="group flex shrink-0 items-center gap-3 rounded-lg"
              aria-label="ABSSS home"
            >
              <span className="rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 p-2.5 shadow-sm transition-transform duration-200 group-hover:-translate-y-0.5">
                <GraduationCap className="h-6 w-6 text-white" />
              </span>
              <span>
                <span className="block text-lg font-extrabold tracking-tight text-primary-800">
                  ABSSS
                </span>
                <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Scientific Society
                </span>
              </span>
            </Link>

            <nav
              className="hidden items-center gap-0.5 xl:flex"
              aria-label="Primary navigation"
            >
              {items.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-primary-50 text-primary-800"
                        : "text-slate-600 hover:bg-slate-50 hover:text-primary-700"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <AuthActions user={user} onLogout={handleLogout} />

            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition-colors hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700 xl:hidden"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {isMenuOpen && (
            <MobileMenu
              navigation={items}
              pathname={pathname}
              user={user}
              onClose={() => setIsMenuOpen(false)}
              onLogout={handleLogout}
            />
          )}
        </div>
      </header>
      <span id="main-content" tabIndex={-1} className="sr-only">
        Main content
      </span>
    </>
  );
};

function AuthActions({
  user,
  onLogout,
}: {
  user: any;
  onLogout: () => void;
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [pathname]);

  if (!user) {
    return (
      <div className="hidden shrink-0 items-center gap-2 xl:flex">
        <Link href="/login" className="btn-quiet text-sm">
          Log in
        </Link>
        <Link href="/signup" className="btn-primary px-4 py-2.5 text-sm">
          Join ABSSS
        </Link>
      </div>
    );
  }

  return (
    <div className="relative hidden shrink-0 xl:block">
      <button
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        className="flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-sm font-semibold text-slate-700 transition-colors hover:border-primary-200 hover:bg-primary-50"
        aria-haspopup="menu"
        aria-expanded={menuOpen}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-100 font-bold text-primary-800">
          {user.username?.charAt(0).toUpperCase() || "U"}
        </span>
        <span className="max-w-28 truncate">{user.username}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${menuOpen ? "rotate-180" : ""}`}
        />
      </button>

      {menuOpen && (
        <div
          className="absolute right-0 mt-2 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl"
          role="menu"
        >
          {canManage(user.role) && (
            <Link
              href="/admin"
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-primary-700 hover:bg-primary-50"
              role="menuitem"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
          )}
          <Link
            href="/profile"
            className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            role="menuitem"
          >
            <UserRound className="h-4 w-4" />
            Profile
          </Link>
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-red-50 hover:text-red-700"
            role="menuitem"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

function MobileMenu({
  navigation: items,
  pathname,
  user,
  onClose,
  onLogout,
}: {
  navigation: Array<{ name: string; href: string }>;
  pathname: string;
  user: any;
  onClose: () => void;
  onLogout: () => void;
}) {
  return (
    <div
      id="mobile-navigation"
      className="absolute inset-x-0 top-[72px] max-h-[calc(100vh-72px)] overflow-y-auto border-t border-slate-200 bg-white px-4 pb-6 pt-3 shadow-xl xl:hidden"
    >
      <nav className="container-max grid gap-1" aria-label="Mobile navigation">
        {items.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              aria-current={isActive ? "page" : undefined}
              className={`rounded-xl px-4 py-3 text-base font-semibold ${
                isActive
                  ? "bg-primary-50 text-primary-800"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              {item.name}
            </Link>
          );
        })}

        <div className="mt-3 grid gap-2 border-t border-slate-200 pt-4">
          {!user ? (
            <>
              <Link href="/login" className="btn-outline w-full" onClick={onClose}>
                Log in
              </Link>
              <Link href="/signup" className="btn-primary w-full" onClick={onClose}>
                Join ABSSS
              </Link>
            </>
          ) : (
            <>
              <Link href="/profile" className="btn-outline w-full" onClick={onClose}>
                <UserRound className="h-4 w-4" />
                Profile
              </Link>
              <button type="button" onClick={onLogout} className="btn-quiet w-full">
                <LogOut className="h-4 w-4" />
                Log out
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Header;
