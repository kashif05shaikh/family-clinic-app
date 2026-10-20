import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { createAppointment } from '../api/appointments';
import { Card, Button } from '../components/ui';

const initialForm = {
  name: '',
  age: '',
  gender: '',
  phone: '',
  email: '',
  symptoms: '',
  appointmentType: 'Normal',
  preferredDate: '',
};

export default function Appointment() {
  const location = useLocation();
  const selectedService = location.state?.service;
  const isEmergency = location.state?.emergency || selectedService === 'Emergency Care';

  const [form, setForm] = useState(() => ({
    ...initialForm,
    appointmentType: isEmergency ? 'Emergency' : 'Normal',
    symptoms:
      selectedService && selectedService !== 'Emergency Care'
        ? `Consultation for ${selectedService}`
        : '',
  }));
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedService) {
      setForm((prev) => ({
        ...prev,
        appointmentType: isEmergency ? 'Emergency' : prev.appointmentType,
        symptoms:
          prev.symptoms || (selectedService !== 'Emergency Care' ? `Consultation for ${selectedService}` : ''),
      }));
    }
  }, [selectedService, isEmergency]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const validate = () => {
    if (!form.name.trim()) return 'Please enter patient name.';
    if (!form.age || form.age < 1 || form.age > 120) return 'Please enter a valid age (1-120).';
    if (!form.gender) return 'Please select gender.';
    if (!form.phone.trim()) return 'Please enter phone number.';
    if (!form.email.trim()) return 'Please enter email.';
    if (!form.symptoms.trim()) return 'Please describe symptoms or reason for visit.';
    if (!form.preferredDate) return 'Please select preferred date.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setLoading(true);
    setError('');
    try {
      await createAppointment({
        ...form,
        age: Number(form.age),
        preferredDate: new Date(form.preferredDate).toISOString(),
      });
      setSuccess(true);
      setForm(initialForm);
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.message || 'Failed to book appointment. Please try again.');
      } else if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
        setError('Cannot reach the server. It may be waking up — please wait a moment and try again.');
      } else if (err.code === 'ECONNABORTED') {
        setError('Request timed out. The server may be starting up — please try again.');
      } else {
        setError('Failed to book appointment. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center animate-fade-in">
        <div className="rounded-full w-20 h-20 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 flex items-center justify-center mx-auto mb-6 shadow-glow-emerald">
          <svg className="w-10 h-10 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white mb-3">
          Appointment Request Confirmed!
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed text-sm sm:text-base">
          We have received your appointment request and forwarded it to Dr. Falak Khaleel Ahmed. The clinic will call or email you shortly.
        </p>
        <Button variant="secondary" onClick={() => setSuccess(false)}>
          Book Another Appointment
        </Button>
      </div>
    );
  }

  const minDate = new Date().toISOString().slice(0, 10);

  const inputClass =
    'w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-primary-500/25 focus:border-primary-500 transition-all duration-200 outline-none text-sm';

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center mb-8 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 text-xs font-semibold mb-3 border border-primary-200/60 dark:border-primary-800/60">
          🗓️ Easy Online Booking
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white mb-2">
          Book an Appointment
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
          Fill in your details below. For urgent emergencies, please visit the clinic directly during open hours.
        </p>
      </div>

      <Card className="p-6 sm:p-10 shadow-lg animate-slide-up" as="form" onSubmit={handleSubmit} padding={false}>
        <div className="space-y-6">
          {/* Patient Name & Age */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Patient Name *
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className={inputClass}
                placeholder="e.g. Ayesha Shaikh"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Age *
              </label>
              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                min={1}
                max={120}
                className={inputClass}
                placeholder="e.g. 28"
                required
              />
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Gender *
            </label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className={inputClass}
              required
            >
              <option value="">Select Gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Phone & Email */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className={inputClass}
                placeholder="e.g. 9876543210"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={inputClass}
                placeholder="e.g. patient@gmail.com"
                required
              />
            </div>
          </div>

          {/* Symptoms */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Symptoms / Reason for Visit *
            </label>
            <textarea
              name="symptoms"
              value={form.symptoms}
              onChange={handleChange}
              rows={3}
              className={inputClass}
              placeholder="Describe your health symptoms, fever, checkup, etc."
              required
            />
          </div>

          {/* Appointment Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Appointment Priority *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label
                className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  form.appointmentType === 'Normal'
                    ? 'border-primary-500 bg-primary-50/70 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 font-semibold'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <input
                  type="radio"
                  name="appointmentType"
                  value="Normal"
                  checked={form.appointmentType === 'Normal'}
                  onChange={handleChange}
                  className="text-primary-600 focus:ring-primary-500"
                />
                <span>Normal Visit</span>
              </label>

              <label
                className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                  form.appointmentType === 'Emergency'
                    ? 'border-red-500 bg-red-50/70 dark:bg-red-950/40 text-red-700 dark:text-red-400 font-semibold ring-2 ring-red-500/20'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <input
                  type="radio"
                  name="appointmentType"
                  value="Emergency"
                  checked={form.appointmentType === 'Emergency'}
                  onChange={handleChange}
                  className="text-red-600 focus:ring-red-500"
                />
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  Emergency
                </span>
              </label>
            </div>
          </div>

          {/* Preferred Date */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Preferred Date *
            </label>
            <input
              type="date"
              name="preferredDate"
              value={form.preferredDate}
              onChange={handleChange}
              min={minDate}
              className={inputClass}
              required
            />
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 px-4 py-3 text-sm border border-red-200 dark:border-red-800/80 animate-fade-in flex items-center gap-2">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            loading={loading}
            variant={form.appointmentType === 'Emergency' ? 'danger' : 'primary'}
            size="lg"
            className="w-full"
          >
            {form.appointmentType === 'Emergency' ? 'Submit Emergency Request' : 'Confirm Appointment Request'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
