import axios, { type AxiosResponse } from 'axios'

interface AuthenticateData {
  loginOrEmail: string
  password: string
  keppConnected: boolean
}

export async function authenticate(data: AuthenticateData): Promise<AxiosResponse> {
  return await axios.create().post('/users/authenticate', data)
}
