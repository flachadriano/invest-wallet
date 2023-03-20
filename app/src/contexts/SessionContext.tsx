import jwtDecode from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react';
import SessionData from '../entities/SessionData';
import User from '../entities/User';

const SessionContext = createContext<SessionData>(null!);

interface IAuthProvider {
  children: JSX.Element
}

function AuthProvider({ children }: IAuthProvider) {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string>();
  const [user, setUser] = useState<User>();

  const updateToken = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
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
      setToken: updateToken,
      user,
      setUser
    }}>
      {children}
    </SessionContext.Provider>
  );
}

export {
  AuthProvider,
  SessionContext
};
