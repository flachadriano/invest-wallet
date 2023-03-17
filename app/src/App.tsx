import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/users/Login';
import SignUp from './pages/users/SignUp';
import { RoutePath } from './RoutePath';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutePath.LOGIN} element={<Login />} />
        <Route path={RoutePath.SIGNUP} element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
