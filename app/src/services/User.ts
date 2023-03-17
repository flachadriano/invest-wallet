import axios, { type AxiosResponse } from 'axios';

interface AuthenticateData {
  loginOrEmail: string
  password: string
  keppConnected: boolean
}

export async function authenticate(data: AuthenticateData): Promise<AxiosResponse> {
  const res = await axios.create().post('/users/authenticate', data);
  return res;
}

interface CreateData {
  name: string;
  email: string;
  login: string;
  password: string;
}

export async function create(data: CreateData) {
  const res = await axios.create().post('/users', data);
  return res;
}
