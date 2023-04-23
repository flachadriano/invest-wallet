import User from './User';

export default interface SessionData {
  loading: boolean;
  token?: string;
  refreshToken?: string;
  user?: User;
  showMenu: boolean;
  toggleMenu: () => void;
  signIn: (token: string, refreshToken: string) => void;
  signOut: () => void;
}
