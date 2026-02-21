import { Link } from 'react-router-dom';
import { Card, Button } from '../components/ui';

const services = [
  {
    title: 'General Consultation',
    description: 'Comprehensive health check-ups and routine consultations for the whole family.',
    icon: '🩺',
  },
  {
    title: 'Diabetes Management',
    description: 'Personalized care and monitoring for diabetes prevention and management.',
    icon: '💉',
  },
  {
    title: 'Skin Treatments',
    description: 'Expert care for common skin conditions and dermatological concerns.',
    icon: '✨',
  },
  {
    title: 'Emergency Care',
    description: 'Prompt attention for urgent medical needs during clinic hours.',
    icon: '🚨',
  },
];

const testimonials = [
  {
    text: 'Dr Falak is very caring and explains everything clearly. Highly recommend for family health.',
    author: 'Patient',
  },
  {
    text: 'Professional and friendly. The clinic is clean and appointments are well managed.',
    author: 'Patient',
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-medical-green/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center animate-slide-up">
            <h1 className="font-display font-bold text-4xl sm:text-5xl text-slate-900 mb-4">
              Welcome to <span className="text-primary-600">Falak Family Clinic</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
              Quality family healthcare with a personal touch. Dr Falak Khaleel Ahmed is here for you and your family.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button as={Link} to="/appointment" variant="primary" size="lg">
                Book Appointment
              </Button>
              <Button as="a" href="#contact" variant="secondary" size="lg">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Profile */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="font-display font-bold text-3xl text-center text-slate-900 mb-12">
            Our Doctor
          </h2>
          <Card className="max-w-2xl mx-auto animate-fade-in">
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <div className="w-24 h-24 rounded-2xl bg-primary-100 flex items-center justify-center text-4xl flex-shrink-0">
                👩‍⚕️
              </div>
              <div className="text-center sm:text-left">
                <h3 className="font-display font-bold text-xl text-primary-600">Dr Falak Khaleel Ahmed</h3>
                <p className="text-emerald-600 font-medium mt-1">BUMS, PGDEMS (Mumbai)</p>
                <p className="text-slate-600 mt-2">Family Physician</p>
                <p className="text-slate-500 text-sm mt-1">3 years of experience</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="font-display font-bold text-3xl text-center text-slate-900 mb-12">
            Our Services
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <Card key={s.title} hover className="animate-slide-up">
                <span className="text-3xl mb-3 block">{s.icon}</span>
                <h3 className="font-display font-semibold text-lg text-slate-900">{s.title}</h3>
                <p className="text-slate-600 text-sm mt-2">{s.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timings */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display font-bold text-3xl text-slate-900 mb-4">Clinic Timings</h2>
          <p className="text-slate-600 mb-2">Open daily including Sunday</p>
          <p className="text-2xl font-display font-semibold text-emerald-600">10:30 AM – 2:00 PM</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-primary-50/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="font-display font-bold text-3xl text-center text-slate-900 mb-12">
            What Patients Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((t) => (
              <Card key={t.text}>
                <p className="text-slate-700 italic">"{t.text}"</p>
                <cite className="not-italic text-slate-500 text-sm mt-2 block">— {t.author}</cite>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="font-display font-bold text-3xl text-center text-slate-900 mb-12">
            Contact Us
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-slate-600">
                <strong className="text-slate-900">Email:</strong>{' '}
                <a href="mailto:drfalakkhaleelahmed@gmail.com" className="text-primary-600 hover:underline">
                  drfalakkhaleelahmed@gmail.com
                </a>
              </p>
              <p className="text-slate-600">
                <strong className="text-slate-900">Timings:</strong> 10:30 AM – 2:00 PM (Open daily including Sunday)
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-sm bg-slate-100 min-h-[200px] flex items-center justify-center border border-slate-200/80">
              <p className="text-slate-500 text-sm">Google Map placeholder — add your clinic address embed</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
