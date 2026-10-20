import { useState } from 'react';
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
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

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
        <div className="rounded-full w-16 h-16 bg-emerald-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-display font-bold text-2xl text-slate-900 mb-2">Appointment Request Sent</h2>
        <p className="text-slate-600 mb-6">
          We have received your request. The clinic will contact you to confirm. For emergencies, please visit during clinic hours.
        </p>
        <Button variant="ghost" onClick={() => setSuccess(false)}>
          Book another appointment
        </Button>
      </div>
    );
  }

  const minDate = new Date().toISOString().slice(0, 10);

  const inputClass =
    'w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-200 outline-none';

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="font-display font-bold text-3xl text-slate-900 mb-2">Book an Appointment</h1>
      <p className="text-slate-600 mb-8">Fill in the form below. We will get back to you to confirm.</p>

      <Card className="p-6 sm:p-8" as="form" onSubmit={handleSubmit} padding={false}>
        <div className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Patient Name *</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} className={inputClass} placeholder="Full name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Age *</label>
            <input type="number" name="age" value={form.age} onChange={handleChange} min={1} max={120} className={inputClass} placeholder="Age" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Gender *</label>
          <select name="gender" value={form.gender} onChange={handleChange} className={inputClass}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone *</label>
            <input type="tel" name="phone" value={form.phone} onChange={handleChange} className={inputClass} placeholder="Phone number" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email *</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className={inputClass} placeholder="Email" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Symptoms / Reason for visit *</label>
          <textarea name="symptoms" value={form.symptoms} onChange={handleChange} rows={3} className={inputClass} placeholder="Brief description" />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Appointment Type *</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="appointmentType" value="Normal" checked={form.appointmentType === 'Normal'} onChange={handleChange} className="text-primary-600 focus:ring-primary-500" />
              <span>Normal</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="appointmentType" value="Emergency" checked={form.appointmentType === 'Emergency'} onChange={handleChange} className="text-red-600 focus:ring-red-500" />
              <span className="font-semibold text-red-600">Emergency</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Preferred Date *</label>
          <input type="date" name="preferredDate" value={form.preferredDate} onChange={handleChange} min={minDate} className={inputClass} />
        </div>

        {error && (
          <div className="rounded-xl bg-red-50 text-red-700 px-4 py-3 text-sm border border-red-100">{error}</div>
        )}

        <Button
          type="submit"
          disabled={loading}
          loading={loading}
          variant={form.appointmentType === 'Emergency' ? 'danger' : 'primary'}
          className="w-full"
        >
          {form.appointmentType === 'Emergency' ? 'Submit Emergency Request' : 'Submit Appointment Request'}
        </Button>
        </div>
      </Card>
    </div>
  );
}
