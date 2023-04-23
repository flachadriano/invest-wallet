import React, { createContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import SessionData from '../entities/SessionData';
import User from '../entities/User';
import api from '../services/Api';

const SessionContext = createContext<SessionData>(null!);

interface IAuthProvider {
  children: JSX.Element
}

function AuthProvider({ children }: IAuthProvider) {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | undefined>();
  const [refreshToken, setRefreshToken] = useState<string | undefined>();
  const [user, setUser] = useState<User | undefined>();
  const [showMenu, setShowMenu] = useState(false);

  const signIn = (newToken: string, newRefreshToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    localStorage.setItem('refresh-token', newRefreshToken);
    setRefreshToken(newRefreshToken);

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

        api.defaults.headers.common = {
          Authorization: `Bearer ${storageToken}`,
        };
      }
      setLoading(false);
    }
  }, []);

  return (
    <SessionContext.Provider value={{
      loading,
      token,
      refreshToken,
      user,
      signIn,
      signOut,
      showMenu,
      toggleMenu: () => setShowMenu(!showMenu)
    }}>
      {children}
    </SessionContext.Provider>
  );
}

export {
  AuthProvider,
  SessionContext
};
