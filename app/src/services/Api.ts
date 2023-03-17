import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response.data)
);

export default api;
