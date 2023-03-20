import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { RoutePath } from './RoutePath';
import { AuthProvider, SessionContext } from './contexts/SessionContext';
import Header from './components/Header';

import Login from './pages/users/Login';
import SignUp from './pages/users/SignUp';
import Home from './pages/Home';

import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const sessionData = useContext(SessionContext);

  if (sessionData.loading) {
    return <h1>Loading</h1>;
  }
  if (sessionData.token) {
    return children;
  }
  return <Login />;
};

function App(): JSX.Element {
  return (
    <div>
      <ToastContainer />
      <AuthProvider>
        <div>
          <Header />
          <BrowserRouter>
            <Routes>
              <Route path={RoutePath.LOGIN} element={<Login />} />
              <Route path={RoutePath.SIGNUP} element={<SignUp />} />
              <Route path={RoutePath.HOME} element={<RequireAuth><Home /></RequireAuth>} />
            </Routes>
          </BrowserRouter>
        </div>
      </AuthProvider>
    </div>
  );
}

export default App;
