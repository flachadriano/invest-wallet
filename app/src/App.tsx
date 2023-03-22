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

function App(): JSX.Element {
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
          <BrowserRouter>
            <Routes>
              <Route path={RoutePath.LOGIN} element={<Login />} />
              <Route path={RoutePath.SIGNUP} element={<SignUp />} />
              <Route path={RoutePath.HOME} element={<RequireAuth><Home /></RequireAuth>} />
            </Routes>
          </BrowserRouter>
        </Box>
      </AuthProvider>
    </ColorProvider>
  );
}

export default App;
