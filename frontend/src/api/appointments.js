import client from './client';

export const createAppointment = (data) => client.post('/api/appointments', data);
export const getAppointments = () => client.get('/api/appointments');
export const updateAppointmentStatus = (id, status) =>
  client.put(`/api/appointments/${id}/status`, { status });
