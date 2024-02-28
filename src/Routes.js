// AuthRoutes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Componenet/Home';
import Login from './Componenet/Login';
import SignUp from './Componenet/SignUp';
import { useAuth } from './AuthContext';

const AuthRoutes = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default AuthRoutes;
