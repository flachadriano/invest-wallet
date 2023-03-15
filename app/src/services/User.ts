import axios from "axios";

interface AuthenticateData {
  loginOrEmail: string;
  password: string;
  keppConnected: boolean;
}

export function authenticate(data: AuthenticateData) {
  axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
  }).post('/users/authenticate', data);
}