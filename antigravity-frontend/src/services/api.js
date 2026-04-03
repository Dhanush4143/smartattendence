import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  getProfile: () => api.get('/users/profile'),
  getStudents: () => api.get('/users/students'),
  createStudent: (data) => api.post('/users/students', data)
};

export const moduleService = {
  getAll: () => api.get('/modules'),
  create: (data) => api.post('/modules', data)
};

export const attendanceService = {
  mark: (moduleId, date, status) => api.post('/attendance/mark', { moduleId, date, status }),
  bulkMark: (data) => api.post('/attendance/bulk', data),
  getReport: () => api.get('/attendance/report')
};

export default api;
