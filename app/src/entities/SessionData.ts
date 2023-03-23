import User from './User';

interface SessionData {
  loading: boolean;
  token?: string;
  user?: User;
  showMenu: boolean;
  toggleMenu: () => void;
  signIn: (token: string) => void;
  signOut: () => void;
}

export default SessionData;
