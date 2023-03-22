import React, { useContext } from 'react';
import { SessionContext } from '../contexts/SessionContext';
import Login from '../pages/users/Login';

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const sessionData = useContext(SessionContext);

  if (sessionData.loading) {
    return <h1>Loading</h1>;
  }
  if (sessionData.token) {
    return children;
  }
  return <Login />;
}
