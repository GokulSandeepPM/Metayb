import axios from 'axios';

// Create an axios instance with a base URL
const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

// Interceptor to attach token to headers
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
}, (error) => {
  console.error('Request error:', error);
  return Promise.reject(error);
});

// Global response error handler
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Response Error:', error.response.data?.message || 'An error occurred');
    } else {
      console.error('Network/Server Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Authentication
export const login = (credentials) => API.post('/auth/login', credentials);

// Employee Operations
export const fetchUnassembledBikes = () => API.get('/bikes/unassembled');
export const assignBike = (bikeId) => API.post('/bikes/assign', { bikeId });
export const completeBike = (bikeId,assemblyTime) => API.post('/bikes/complete', { bikeId, assemblyTime });
export const fetchUnderAssemblyBike = () => API.get('/bikes/under-assembly');

// Admin Operations
export const fetchAssemblyStats = (fromDate, toDate) =>
  API.get(`/bikes/assembly-stats?fromDate=${fromDate}&toDate=${toDate}`);

export const fetchEmployeeProductionStats = (date) =>
  API.get(`/bikes/employee-production?date=${date}`);

export default API;
