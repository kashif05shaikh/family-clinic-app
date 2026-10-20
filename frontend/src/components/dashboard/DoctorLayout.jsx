import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Outlet } from 'react-router-dom';
import SidebarNav from './SidebarNav';
import ThemeToggle from '../ui/ThemeToggle';

function DoctorName({ email }) {
  const name = email?.split('@')[0] || 'Doctor';
  const display = name.replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  return display;
}

export default function DoctorLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50/90 dark:bg-[#0b1120] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200/90 dark:border-slate-800 shadow-sm transition-transform duration-300 ease-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 sm:h-20 px-4 border-b border-slate-100 dark:border-slate-800">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 rounded-xl py-2 pr-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/60"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-display font-bold text-sm shadow-md shadow-primary-500/25">
                FFC
              </div>
              <div className="min-w-0">
                <span className="font-display font-bold text-slate-900 dark:text-white block truncate text-sm">
                  Falak Clinic
                </span>
                <span className="text-xs text-primary-600 dark:text-primary-400 font-medium block">
                  Doctor Portal
                </span>
              </div>
            </Link>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <SidebarNav
            onItemClick={() => setSidebarOpen(false)}
            renderLogout={(LogoutIcon) => (
              <button
                type="button"
                onClick={handleLogout}
                className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200"
              >
                <span className="flex shrink-0 w-9 h-9 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-red-100 dark:group-hover:bg-red-900/60 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                  <LogoutIcon className="w-5 h-5" />
                </span>
                <span>Sign Out</span>
              </button>
            )}
          />
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={() => setSidebarOpen(false)}
          aria-hidden
        />
      )}

      {/* Main Area */}
      <div className="lg:pl-64 min-h-screen flex flex-col">
        <header className="sticky top-0 z-20 h-16 sm:h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between px-4 sm:px-6 gap-4 shadow-sm transition-colors duration-300">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex-1 min-w-0" />

          <div className="flex items-center gap-3">
            <ThemeToggle />

            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1" />

            <div className="flex items-center gap-2.5 pl-1">
              <span className="hidden sm:block text-xs font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[160px]">
                Dr. <DoctorName email={user?.email} />
              </span>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-sm shadow-md ring-2 ring-white dark:ring-slate-800">
                {user?.email?.charAt(0).toUpperCase() || 'D'}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
