import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Box } from '@mui/material';
import { RoutePath } from './RoutePath';
import { AuthProvider } from './contexts/SessionContext';
import { ColorProvider } from './contexts/ColorModeContext';
import Header from './components/Header';
import RequireAuth from './components/RequireAuth';
import Login from './pages/users/Login';
import SignUp from './pages/users/SignUp';
import Home from './pages/Home';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';
import Menu from './components/Menu';
import BrokerList from './pages/brokers/List';

function App(): JSX.Element {
  const protectedRoutes = [{
    path: RoutePath.HOME, render: () => <Home />,
  }, {
    path: RoutePath.BROKERS, render: () => <BrokerList />
  }];

  return (
    <ColorProvider>
      <AuthProvider>
        <Box sx={{
          height: '100vh',
          width: '100%',
          bgcolor: 'background.default',
          color: 'text.primary',
        }}>
          <ToastContainer />
          <Header />
          <Box sx={{ display: 'flex', height: '100%' }}>
            <Menu />
            <Box sx={{ p: 3 }}>
              <BrowserRouter>
                <Routes>
                  <Route path={RoutePath.LOGIN} element={<Login />} />
                  <Route path={RoutePath.SIGNUP} element={<SignUp />} />
                  {protectedRoutes.map(({ path, render }) => (
                    <Route key={path} path={path} element={<RequireAuth>{render()}</RequireAuth>} />
                  ))}
                </Routes>
              </BrowserRouter>
            </Box>
          </Box>
        </Box>
      </AuthProvider>
    </ColorProvider>
  );
}

export default App;
