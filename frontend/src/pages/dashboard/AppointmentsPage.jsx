import { useState, useEffect, useCallback, useMemo } from 'react';
import { getAppointments, updateAppointmentStatus } from '../../api/appointments';
import { io } from 'socket.io-client';
import StatusBadge from '../../components/dashboard/StatusBadge';
import AppointmentFilters from '../../components/dashboard/AppointmentFilters';
import { Card, PageSpinner } from '../../components/ui';

const SOCKET_URL = import.meta.env.VITE_API_URL || undefined;

function filterAppointments(list, { statusFilter, typeFilter, searchQuery }) {
  return list.filter((a) => {
    if (statusFilter && a.status !== statusFilter) return false;
    if (typeFilter && a.appointmentType !== typeFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        a.name?.toLowerCase().includes(q) ||
        a.phone?.includes(q) ||
        a.email?.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

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
        next.sort(
          (a, b) =>
            (b.priority ?? 0) - (a.priority ?? 0) ||
            new Date(a.createdAt) - new Date(b.createdAt)
        );
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

  const filtered = useMemo(
    () =>
      filterAppointments(appointments, {
        statusFilter,
        typeFilter,
        searchQuery,
      }),
    [appointments, statusFilter, typeFilter, searchQuery]
  );

  const handleStatusChange = async (id, status) => {
    try {
      const { data } = await updateAppointmentStatus(id, status);
      setAppointments((prev) => prev.map((a) => (a._id === id ? data : a)));
    } catch (_) {
      setError('Failed to update status.');
    }
  };

  if (loading) {
    return <PageSpinner />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-slate-900">Appointments</h1>
        <p className="text-slate-500 text-sm mt-1">Queue sorted by priority · Emergency first</p>
      </div>

      <AppointmentFilters
        statusFilter={statusFilter}
        typeFilter={typeFilter}
        searchQuery={searchQuery}
        onStatusChange={setStatusFilter}
        onTypeChange={setTypeFilter}
        onSearchChange={setSearchQuery}
        resultCount={filtered.length}
      />

      {error && (
        <div className="rounded-xl bg-red-50 text-red-700 px-4 py-3 text-sm border border-red-100">
          {error}
        </div>
      )}

      <Card padding={false} hover={false} className="overflow-hidden">
        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                  Patient
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                  Contact
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                  Date & type
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                  Status
                </th>
                <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No appointments match your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((apt) => (
                  <tr
                    key={apt._id}
                    className="group transition-colors duration-150 hover:bg-slate-50/80"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-slate-900">{apt.name}</span>
                        {apt.appointmentType === 'Emergency' && (
                          <span className="rounded-lg border border-red-200 bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700">
                            Emergency
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-500 mt-0.5 truncate max-w-[200px]">
                        {apt.symptoms}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      <div>{apt.phone}</div>
                      <div className="text-slate-500 truncate max-w-[180px]">{apt.email}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {new Date(apt.preferredDate).toLocaleDateString(undefined, {
                        dateStyle: 'medium',
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={apt.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <select
                        value={apt.status}
                        onChange={(e) => handleStatusChange(apt._id, e.target.value)}
                        className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 bg-white hover:border-slate-300 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-200 outline-none cursor-pointer"
                      >
                        <option value="Waiting">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-slate-100">
          {filtered.length === 0 ? (
            <div className="px-6 py-12 text-center text-slate-500">
              No appointments match your filters.
            </div>
          ) : (
            filtered.map((apt) => (
              <div
                key={apt._id}
                className={`p-6 transition-colors duration-150 hover:bg-slate-50/80 ${
                  apt.appointmentType === 'Emergency' ? 'border-l-4 border-l-red-500' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium text-slate-900">{apt.name}</span>
                      {apt.appointmentType === 'Emergency' && (
                        <span className="rounded-lg border border-red-200 bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700">
                          Emergency
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-500 mt-1">
                      {apt.phone} · {apt.email}
                    </p>
                    <p className="text-sm text-slate-600 mt-2 line-clamp-2">{apt.symptoms}</p>
                    <p className="text-sm text-slate-500 mt-1">
                      {new Date(apt.preferredDate).toLocaleDateString(undefined, {
                        dateStyle: 'medium',
                      })}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <StatusBadge status={apt.status} />
                    <select
                      value={apt.status}
                      onChange={(e) => handleStatusChange(apt._id, e.target.value)}
                      className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none cursor-pointer"
                    >
                      <option value="Waiting">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
