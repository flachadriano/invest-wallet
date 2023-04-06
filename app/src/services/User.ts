import User from '../entities/User';
import api from './Api';

interface AuthenticateRequest {
  loginOrEmail: string
  password: string
  keppConnected: boolean
}

export interface AuthenticateResponse {
  token: string;
  user: User;
}

export async function authenticate(params: AuthenticateRequest): Promise<AuthenticateResponse> {
  const { data } = await api.post('/users/authenticate', params);
  return data;
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
