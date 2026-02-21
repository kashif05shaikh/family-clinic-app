import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAppointments, updateAppointmentStatus } from '../api/appointments';
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL || undefined;

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAppointments = useCallback(async () => {
    try {
      const { data } = await getAppointments();
      setAppointments(data);
      setError('');
    } catch (e) {
      setError('Failed to load appointments.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  useEffect(() => {
    const socket = io(SOCKET_URL, { path: '/socket.io' });
    socket.on('appointment:new', (appointment) => {
      setAppointments((prev) => {
        const next = [appointment, ...prev];
        next.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0) || new Date(a.createdAt) - new Date(b.createdAt));
        return next;
      });
    });
    socket.on('appointment:updated', (updated) => {
      setAppointments((prev) =>
        prev.map((a) => (a._id === updated._id ? { ...a, ...updated } : a))
      );
    });
    return () => socket.disconnect();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const { data } = await updateAppointmentStatus(id, status);
      setAppointments((prev) =>
        prev.map((a) => (a._id === id ? data : a))
      );
    } catch (_) {
      setError('Failed to update status.');
    }
  };

  const today = new Date().toISOString().slice(0, 10);
  const todayAppointments = appointments.filter(
    (a) => new Date(a.preferredDate).toISOString().slice(0, 10) === today
  );
  const emergencyCount = appointments.filter((a) => a.appointmentType === 'Emergency').length;

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display font-bold text-2xl text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm">Logged in as {user?.email}</p>
        </div>
        <button
          onClick={logout}
          className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Logout
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-soft">
          <p className="text-gray-500 text-sm">Appointments today</p>
          <p className="font-display font-bold text-3xl text-primary-600">{todayAppointments.length}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-soft">
          <p className="text-gray-500 text-sm">Emergency in queue</p>
          <p className="font-display font-bold text-3xl text-red-600">{emergencyCount}</p>
        </div>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 text-red-700 px-4 py-3 mb-4">{error}</div>
      )}

      <h2 className="font-display font-semibold text-lg text-gray-900 mb-4">Appointment Queue</h2>
      <p className="text-gray-500 text-sm mb-4">Emergency patients appear first. Use the dropdown to update status.</p>

      <div className="space-y-3">
        {appointments.length === 0 ? (
          <div className="bg-gray-50 rounded-2xl p-8 text-center text-gray-500">
            No appointments in queue.
          </div>
        ) : (
          appointments.map((apt) => (
            <div
              key={apt._id}
              className={`bg-white rounded-xl p-4 shadow-soft flex flex-col sm:flex-row sm:items-center gap-4 ${
                apt.appointmentType === 'Emergency' ? 'border-l-4 border-red-500' : ''
              }`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-gray-900">{apt.name}</span>
                  {apt.appointmentType === 'Emergency' && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                      Emergency
                    </span>
                  )}
                  <span className="text-gray-500 text-sm">
                    {new Date(apt.preferredDate).toLocaleDateString()} · {apt.symptoms?.slice(0, 40)}
                    {apt.symptoms?.length > 40 ? '...' : ''}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {apt.phone} · {apt.email}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <select
                  value={apt.status}
                  onChange={(e) => handleStatusChange(apt._id, e.target.value)}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="Waiting">Waiting</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
