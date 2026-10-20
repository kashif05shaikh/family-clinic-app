import { Link } from 'react-router-dom';
import { Card, Button } from '../components/ui';

const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '5,000+', label: 'Happy Patients' },
  { value: '7 Days', label: 'Open Daily' },
  { value: '100%', label: 'Dedicated Care' },
];

const services = [
  {
    title: 'General Consultation',
    description: 'Comprehensive health check-ups, diagnostic evaluations, and routine care for patients of all ages.',
    icon: '🩺',
    badge: 'Popular',
    gradient: 'from-blue-500/10 to-indigo-500/10',
  },
  {
    title: 'Diabetes Management',
    description: 'Personalized nutritional guidance, blood glucose monitoring, and long-term preventive care plans.',
    icon: '💉',
    badge: 'Specialized',
    gradient: 'from-emerald-500/10 to-teal-500/10',
  },
  {
    title: 'Skin & Dermatology',
    description: 'Diagnosis and modern treatment for allergies, infections, eczema, and everyday skin conditions.',
    icon: '✨',
    badge: 'Care',
    gradient: 'from-amber-500/10 to-orange-500/10',
  },
  {
    title: 'Emergency Care',
    description: 'Immediate priority clinical attention for acute conditions and urgent symptoms during clinic hours.',
    icon: '🚨',
    badge: 'Priority',
    gradient: 'from-rose-500/10 to-red-500/10',
  },
];

const testimonials = [
  {
    text: 'Dr. Falak is exceptionally patient, thorough, and compassionate. She explained the entire diagnosis clearly and the treatment worked wonderfully.',
    author: 'Ayesha Khan',
    role: 'Patient',
  },
  {
    text: 'Very clean clinic, polite staff, and short wait times. Booking online made the whole visit effortless. Highly recommended for family health!',
    author: 'Mohammed Rizwan',
    role: 'Family Member',
  },
];

export default function Home() {
  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:pt-16 sm:pb-24">
        {/* Decorative background glow circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-primary-400/20 to-emerald-400/20 dark:from-primary-500/10 dark:to-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-float-slow -z-10" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto space-y-6 animate-slide-up">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-200 dark:border-primary-800/60 bg-primary-50/80 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 text-xs font-semibold tracking-wide shadow-sm backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Trusted Family Healthcare in Mumbai
            </div>

            <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-slate-900 dark:text-white tracking-tight leading-[1.15]">
              Caring for your family's health with{' '}
              <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-teal-500 bg-clip-text text-transparent">
                trust & empathy
              </span>
            </h1>

            <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Led by <strong className="text-slate-900 dark:text-white font-semibold">Dr. Falak Khaleel Ahmed</strong>, we provide attentive medical consultations, preventive screenings, and priority emergency care.
            </p>

            <div className="pt-2 flex flex-wrap justify-center items-center gap-4">
              <Button as={Link} to="/appointment" variant="primary" size="lg" className="w-full sm:w-auto shadow-primary-500/30">
                Book an Appointment
                <svg className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Button>

              <Button as="a" href="#doctor" variant="secondary" size="lg" className="w-full sm:w-auto">
                Meet the Doctor
              </Button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-14 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((s, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-sm text-center shadow-sm hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="font-display font-bold text-2xl sm:text-3xl text-primary-600 dark:text-primary-400">
                  {s.value}
                </div>
                <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctor Profile Section */}
      <section id="doctor" className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white mb-3">
            Meet Your Family Doctor
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Personalized, attentive consultations focused on preventative wellness and patient comfort.
          </p>
        </div>

        <Card className="max-w-3xl mx-auto overflow-hidden relative border-primary-500/20 dark:border-primary-500/30 shadow-lg">
          <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
            <div className="relative group shrink-0">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-primary-600 to-teal-400 p-1 shadow-lg shadow-primary-500/20">
                <div className="w-full h-full rounded-[22px] bg-white dark:bg-slate-900 flex items-center justify-center text-5xl">
                  👩‍⚕️
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white rounded-full p-1.5 shadow-md" title="Verified Physician">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <div className="space-y-3 text-center sm:text-left flex-1">
              <div>
                <h3 className="font-display font-bold text-2xl text-slate-900 dark:text-white">
                  Dr. Falak Khaleel Ahmed
                </h3>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start mt-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    BUMS
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800">
                    PGDEMS (Mumbai)
                  </span>
                </div>
              </div>

              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Specializing in holistic family healthcare, metabolic wellness, acute emergency intervention, and patient education. Committed to treating every patient with warmth and thorough medical care.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400 justify-center sm:justify-start">
                <div className="flex items-center gap-1.5">
                  <span className="text-primary-500">📍</span> Mumbai, Maharashtra
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-500">⏰</span> Daily 10:30 AM – 2:00 PM
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Services Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white mb-3">
            Our Medical Services
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            From routine wellness to urgent care, we provide end-to-end support for your household.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <Card
              key={s.title}
              hover
              className="flex flex-col justify-between group relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500/10 to-teal-500/10 dark:from-primary-500/20 dark:to-teal-500/20 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                    {s.icon}
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {s.badge}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {s.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-2 leading-relaxed">
                  {s.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center text-primary-600 dark:text-primary-400 text-xs font-semibold group-hover:translate-x-1 transition-transform">
                <span>Book this service</span>
                <span className="ml-1">→</span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="font-display font-bold text-3xl text-slate-900 dark:text-white mb-2">
            What Our Patients Say
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Real experiences from families treated at Falak Clinic.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, idx) => (
            <Card key={idx} className="relative">
              <div className="text-primary-400 text-4xl leading-none font-serif mb-2 select-none">“</div>
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed italic">
                {t.text}
              </p>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm">{t.author}</h4>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
                <div className="text-amber-400 text-sm">★★★★★</div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Bottom CTA Card */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-8">
        <div className="rounded-3xl bg-gradient-to-r from-primary-600 via-primary-700 to-indigo-800 p-8 sm:p-14 text-white text-center shadow-xl shadow-primary-700/20 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="font-display font-bold text-3xl sm:text-4xl">
              Ready to visit Falak Family Clinic?
            </h2>
            <p className="text-primary-100 text-sm sm:text-base">
              Skip the waiting room. Reserve your preferred slot online and receive quick confirmation.
            </p>
            <div className="pt-2">
              <Button
                as={Link}
                to="/appointment"
                variant="secondary"
                size="lg"
                className="bg-white text-primary-700 hover:bg-slate-100 border-none shadow-lg"
              >
                Schedule Appointment Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
