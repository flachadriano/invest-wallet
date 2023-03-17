import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './pages/users/Login';
import SignUp from './pages/users/SignUp';
import { RoutePath } from './RoutePath';

import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

function App(): JSX.Element {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path={RoutePath.LOGIN} element={<Login />} />
          <Route path={RoutePath.SIGNUP} element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
