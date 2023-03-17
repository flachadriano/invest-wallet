import { type AxiosResponse } from 'axios';
import api from './Api';

interface AuthenticateData {
  loginOrEmail: string
  password: string
  keppConnected: boolean
}

export async function authenticate(data: AuthenticateData): Promise<AxiosResponse> {
  const res = await api.post('/users/authenticate', data);
  return res;
}

interface CreateData {
  name: string;
  email: string;
  login: string;
  password: string;
}

export async function create(data: CreateData) {
  const res = await api.post('/users', data);
  return res;
}
