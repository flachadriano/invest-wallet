import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
import Menu from './components/Menu';
import { getRoutes } from './Routes';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

function App(): JSX.Element {
  const queryClient = new QueryClient();
  const protectedRoutes = getRoutes();

  return (
    <QueryClientProvider client={queryClient}>
      <ColorProvider>
        <AuthProvider>
          <Box sx={{
            height: '90vh',
            width: '100%',
            bgcolor: 'background.default',
            color: 'text.primary',
          }}>
            <ToastContainer />
            <Header />
            <Box sx={{ display: 'flex', height: '100%' }}>
              <Menu />
              <Box sx={{ p: 3, display: 'flex', flex: 1 }}>
                <BrowserRouter>
                  <Routes>
                    <Route path={RoutePath.LOGIN} element={<Login />} />
                    <Route path={RoutePath.SIGNUP} element={<SignUp />} />
                    {protectedRoutes.map(({ path, render }) => (
                      <Route
                        key={path}
                        path={path}
                        element={<RequireAuth>{render()}</RequireAuth>}
                      />
                    ))}
                  </Routes>
                </BrowserRouter>
              </Box>
            </Box>
          </Box>
        </AuthProvider>
      </ColorProvider>
    </QueryClientProvider>
  );
}

export default App;
