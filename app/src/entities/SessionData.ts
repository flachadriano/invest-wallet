type SessionData = {
  authenticated: boolean;
  loading: boolean;
  token?: string;
  setAuthenticated: (token: boolean) => void;
};

export default SessionData;
