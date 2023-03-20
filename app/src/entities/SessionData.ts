import User from './User';

interface SessionData {
  loading: boolean;
  token?: string;
  setToken: (token: string) => void;
  user?: User;
  setUser: (user: User) => void;
}

export default SessionData;
