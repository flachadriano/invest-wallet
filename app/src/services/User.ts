import axios from "axios";

interface AuthenticateData {
  loginOrEmail: string;
  password: string;
  keppConnected: boolean;
}

export function authenticate(data: AuthenticateData) {
  axios.create().post('/users/authenticate', data);
}
