import User from './User';

export default interface SessionData {
  loading: boolean;
  token?: string;
  user?: User;
  showMenu: boolean;
  toggleMenu: () => void;
  signIn: (token: string, user: User) => void;
  signOut: () => void;
}
