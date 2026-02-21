import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-200/80 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-display font-semibold text-primary-600 mb-2">Falak Family Clinic</h3>
            <p className="text-slate-600 text-sm">
              Quality family healthcare by Dr Falak Khaleel Ahmed. BUMS, PGDEMS (Mumbai).
            </p>
          </div>
          <div>
            <h3 className="font-display font-semibold text-slate-800 mb-2">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-slate-600 hover:text-primary-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/appointment" className="text-slate-600 hover:text-primary-600 transition-colors">
                  Book Appointment
                </Link>
              </li>
              <li>
                <a
                  href="mailto:drfalakkhaleelahmed@gmail.com"
                  className="text-slate-600 hover:text-primary-600 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-display font-semibold text-slate-800 mb-2">Timings</h3>
            <p className="text-slate-600 text-sm">Open daily including Sunday</p>
            <p className="text-emerald-600 font-medium text-sm">10:30 AM – 2:00 PM</p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-slate-200 text-center text-sm text-slate-500">
          © {currentYear} Falak Family Clinic. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
