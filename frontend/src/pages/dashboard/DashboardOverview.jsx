import { useState, useEffect, useCallback } from 'react';
import { getAppointments } from '../../api/appointments';
import { Link } from 'react-router-dom';
import { Card, Button, PageSpinner } from '../../components/ui';
import MetricCard from '../../components/dashboard/MetricCard';
import AppointmentsChart from '../../components/dashboard/AppointmentsChart';
import StatusChart from '../../components/dashboard/StatusChart';

function CalendarIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}
function AlertIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  );
}
function ClockIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export default function DashboardOverview() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = useCallback(async () => {
    try {
      const { data } = await getAppointments();
      setAppointments(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const today = new Date().toISOString().slice(0, 10);
  const todayCount = appointments.filter(
    (a) => new Date(a.preferredDate).toISOString().slice(0, 10) === today
  ).length;
  const emergencyCount = appointments.filter((a) => a.appointmentType === 'Emergency').length;
  const waitingCount = appointments.filter((a) => a.status === 'Waiting').length;

  if (loading) {
    return <PageSpinner />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            Clinic Dashboard
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Real-time patient attendance and workload summary
          </p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard
          title="Appointments today"
          value={todayCount}
          icon={CalendarIcon}
          accent="primary"
        />
        <MetricCard
          title="Emergency in queue"
          value={emergencyCount}
          icon={AlertIcon}
          accent="error"
        />
        <MetricCard
          title="Pending appointments"
          value={waitingCount}
          subtitle="Waiting for consultation"
          icon={ClockIcon}
          accent="warning"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-display font-bold text-base text-slate-900 dark:text-white mb-4">
            Appointments This Week
          </h3>
          <AppointmentsChart appointments={appointments} />
        </Card>
        <Card>
          <h3 className="font-display font-bold text-base text-slate-900 dark:text-white mb-4">
            Status Breakdown
          </h3>
          <StatusChart appointments={appointments} />
        </Card>
      </div>

      {/* Quick Action */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white">
              Appointment Queue
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
              Review incoming patient symptoms and update status
            </p>
          </div>
          <Button as={Link} to="/dashboard/appointments" variant="primary" size="md">
            View Live Queue
            <span className="ml-1">→</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}
