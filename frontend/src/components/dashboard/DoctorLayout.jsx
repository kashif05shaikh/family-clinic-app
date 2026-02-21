import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Outlet } from 'react-router-dom';
import SidebarNav from './SidebarNav';

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
    <div className="min-h-screen bg-slate-50/90">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-white border-r border-slate-200/90 shadow-sm transition-transform duration-300 ease-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-4 border-b border-slate-100">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 rounded-xl py-2 pr-2 transition-colors hover:bg-slate-50"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-display font-bold text-sm shadow-lg shadow-primary-500/25">
                FFC
              </div>
              <div className="min-w-0">
                <span className="font-display font-semibold text-slate-900 block truncate">
                  Falak Clinic
                </span>
                <span className="text-xs text-slate-500 block">Doctor Portal</span>
              </div>
            </Link>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
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
                className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
              >
                <span className="flex shrink-0 w-9 h-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 group-hover:bg-red-100 group-hover:text-red-600 transition-colors">
                  <LogoutIcon className="w-5 h-5" />
                </span>
                <span>Logout</span>
              </button>
            )}
          />
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/20 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden
        />
      )}

      {/* Main */}
      <div className="lg:pl-64 min-h-screen flex flex-col">
        <header className="sticky top-0 z-20 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/80 flex items-center justify-between px-4 sm:px-6 gap-4 shadow-sm">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex-1 min-w-0" />
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-sm font-medium text-slate-700 truncate max-w-[160px]">
              Dr. <DoctorName email={user?.email} />
            </span>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold text-sm shadow-md ring-2 ring-white">
              {user?.email?.charAt(0).toUpperCase() || 'D'}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
