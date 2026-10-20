import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from '../ui/ThemeToggle';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/appointment', label: 'Book Appointment' },
  { to: '/dashboard', label: 'Dashboard' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-300 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 sm:h-20">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group py-2"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-display font-bold text-lg shadow-md shadow-primary-500/30 group-hover:scale-105 group-hover:shadow-primary-500/50 transition-all duration-300">
            <span>+</span>
          </div>
          <div>
            <span className="font-display font-bold text-xl text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              Falak Family Clinic
            </span>
            <span className="hidden sm:block text-xs text-slate-500 dark:text-slate-400">
              Dr. Falak Khaleel Ahmed
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          <nav className="flex items-center gap-1 bg-slate-100/70 dark:bg-slate-800/70 p-1.5 rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
            {navLinks.map(({ to, label }) => {
              const active = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 relative ${
                    active
                      ? 'text-primary-600 dark:text-white bg-white dark:bg-slate-700 shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2" />

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Book Appointment CTA Button */}
          {location.pathname !== '/appointment' && (
            <Link
              to="/appointment"
              className="ml-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md shadow-primary-600/25 hover:shadow-lg hover:shadow-primary-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              Book Visit
            </Link>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg animate-slide-down">
          <div className="px-4 py-4 flex flex-col gap-2">
            {navLinks.map(({ to, label }) => {
              const active = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-3 font-medium transition-all duration-200 ${
                    active
                      ? 'bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
