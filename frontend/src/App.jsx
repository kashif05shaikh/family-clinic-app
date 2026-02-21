import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout';
import ProtectedRoute from './components/ProtectedRoute';
import DoctorLayout from './components/dashboard/DoctorLayout';
import Home from './pages/Home';
import Appointment from './pages/Appointment';
import Login from './pages/Login';
import DashboardOverview from './pages/dashboard/DashboardOverview';
import AppointmentsPage from './pages/dashboard/AppointmentsPage';

export default function App() {
  return (
    <Routes>
      {/* Public routes with header/footer */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="appointment" element={<Appointment />} />
      </Route>

      {/* Login - full screen, no layout */}
      <Route path="/login" element={<Login />} />

      {/* Doctor dashboard - sidebar + navbar layout */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DoctorLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardOverview />} />
        <Route path="appointments" element={<AppointmentsPage />} />
      </Route>

    </Routes>
  );
}
