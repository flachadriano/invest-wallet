import axios, { AxiosInstance } from 'axios';
import { refreshToken } from './User';

export default function apiPrivate(): AxiosInstance {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      if (!config.headers.Authorization) {
        const token = localStorage.getItem('token');
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error?.config;
      if (error?.response?.status === 401 && !prevRequest?.sent) {
        prevRequest.sent = true;
        const refreshTokenStr = localStorage.getItem('refresh-token');
        if (refreshTokenStr) {
          const tokenData = await refreshToken(refreshTokenStr);
          localStorage.setItem('token', tokenData.token);
          localStorage.setItem('refresh-token', tokenData.refreshToken);
          prevRequest.headers.Authorization = `Bearer ${tokenData.token}`;
          return axiosInstance(prevRequest);
        }
      }
      return Promise.reject(error.response.data);
    }
  );

  return axiosInstance;
}
