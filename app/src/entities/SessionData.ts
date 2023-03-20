import User from './User';

interface SessionData {
  loading: boolean;
  token?: string;
  user?: User;
  signIn: (token: string) => void;
  signOut: () => void;
}

export default SessionData;
