import React, { createContext, useState } from 'react';
import SessionData from '../entities/SessionData';

const SessionContext = createContext<SessionData>(null!);

interface IAuthProvider {
  children: JSX.Element
}

function AuthProvider({ children }: IAuthProvider) {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <SessionContext.Provider value={{ authenticated, setAuthenticated, loading: true }}>
      {children}
    </SessionContext.Provider>
  );
}

export {
  AuthProvider,
  SessionContext
};
