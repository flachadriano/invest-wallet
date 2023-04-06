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
import Home from './pages/Home';
import Menu from './components/Menu';
import BrokerList from './pages/brokers/List';
import BrokerEdit from './pages/brokers/Edit';
import BrokerNew from './pages/brokers/New';
import AssetList from './pages/assets/List';
import AssetEdit from './pages/assets/Edit';
import AssetNew from './pages/assets/New';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

function App(): JSX.Element {
  const queryClient = new QueryClient();

  const protectedRoutes = [{
    path: RoutePath.HOME, render: () => <Home />,
  }, {
    path: RoutePath.ASSETS, render: () => <AssetList />
  }, {
    path: RoutePath.ASSET_EDIT, render: () => <AssetEdit />
  }, {
    path: RoutePath.ASSET_NEW, render: () => <AssetNew />
  }, {
    path: RoutePath.BROKERS, render: () => <BrokerList />
  }, {
    path: RoutePath.BROKER_EDIT, render: () => <BrokerEdit />
  }, {
    path: RoutePath.BROKER_NEW, render: () => <BrokerNew />
  }];

  return (
    <QueryClientProvider client={queryClient}>
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
