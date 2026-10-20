import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800/80 mt-auto transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-sm">
                +
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                Falak Family Clinic
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-sm">
              Comprehensive and compassionate family healthcare by Dr. Falak Khaleel Ahmed.
              BUMS, PGDEMS (Mumbai).
            </p>
          </div>

          <div>
            <h3 className="font-display font-semibold text-slate-900 dark:text-white mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/appointment" className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Book an Appointment
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Doctor Portal Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-slate-900 dark:text-white mb-3">
              Clinic Timings & Contact
            </h3>
            <div className="space-y-2 text-sm">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-medium text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Open daily including Sunday
              </div>
              <p className="font-display font-bold text-lg text-slate-900 dark:text-slate-100">
                10:30 AM – 2:00 PM
              </p>
              <p className="text-slate-500 dark:text-slate-400">
                Email:{' '}
                <a
                  href="mailto:drfalakkhaleelahmed@gmail.com"
                  className="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  drfalakkhaleelahmed@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <p>© {currentYear} Falak Family Clinic. All rights reserved.</p>
          <p>Care · Compassion · Excellence</p>
        </div>
      </div>
    </footer>
  );
}
