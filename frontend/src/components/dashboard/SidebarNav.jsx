import { NavLink } from 'react-router-dom';

const icons = {
  dashboard: (className) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  appointments: (className) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  logout: (className) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  ),
};

export const sidebarNavItems = [
  { to: '/dashboard', label: 'Dashboard', iconKey: 'dashboard', end: true },
  { to: '/dashboard/appointments', label: 'Appointments', iconKey: 'appointments', end: false },
];

export default function SidebarNav({ onItemClick, renderLogout }) {
  return (
    <nav className="flex-1 px-3 py-4 space-y-1">
      {sidebarNavItems.map(({ to, label, iconKey, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={onItemClick}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ease-out ${
              isActive
                ? 'bg-primary-500/10 text-primary-700 shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span
                className={`flex shrink-0 w-9 h-9 items-center justify-center rounded-lg transition-colors ${
                  isActive ? 'bg-primary-500/15 text-primary-600' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {icons[iconKey]?.('w-5 h-5')}
              </span>
              <span>{label}</span>
            </>
          )}
        </NavLink>
      ))}
      {renderLogout && (
        <div className="pt-4 mt-4 border-t border-slate-200/80">
          {renderLogout(icons.logout)}
        </div>
      )}
    </nav>
  );
}
