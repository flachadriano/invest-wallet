import React, { createContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import SessionData from '../entities/SessionData';
import User from '../entities/User';

const SessionContext = createContext<SessionData>(null!);

interface IAuthProvider {
  children: JSX.Element
}

function AuthProvider({ children }: IAuthProvider) {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | undefined>();
  const [user, setUser] = useState<User | undefined>();

  const signIn = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    const jwtUser = jwtDecode<User>(newToken);
    setUser(jwtUser);
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setToken(undefined);
    setUser(undefined);
  };

  useEffect(() => {
    if (!token) {
      const storageToken = localStorage.getItem('token');
      if (storageToken) {
        setToken(storageToken);
        const jwtUser = jwtDecode<User>(storageToken);
        setUser(jwtUser);
        setLoading(false);
      }
    }
  }, []);

  return (
    <SessionContext.Provider value={{
      loading,
      token,
      user,
      signIn,
      signOut
    }}>
      {children}
    </SessionContext.Provider>
  );
}

export {
  AuthProvider,
  SessionContext
};
