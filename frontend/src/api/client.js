import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'https://falak-family-clinic.onrender.com';

const client = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000, // 30 seconds – Render free tier cold-starts can be slow
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('falak_clinic_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

client.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('falak_clinic_token');
      localStorage.removeItem('falak_clinic_user');
      window.location.href = '/login';
    }
    // Log network / CORS errors to help debug
    if (!err.response) {
      console.error('Network error (possible CORS or connectivity issue):', err.message);
    }
    return Promise.reject(err);
  }
);

export default client;
