import jwtDecode from 'jwt-decode';
import User from '../entities/User';
import api from './Api';

interface AuthenticateRequest {
  loginOrEmail: string
  password: string
  keepConnected: boolean
}

export interface AuthenticateResponse {
  token: string;
  refreshToken: string;
  user: User;
}

export async function authenticate(params: AuthenticateRequest): Promise<AuthenticateResponse> {
  const { data } = await api.post<AuthenticateResponse>('/users/authenticate', params);
  console.log(jwtDecode<User>(data.refreshToken));
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

interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
}

// eslint-disable-next-line @typescript-eslint/no-shadow
export async function refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
  const { data } = await api.post<RefreshTokenResponse>('/users/refresh-token', { refreshToken });
  return data;
}
