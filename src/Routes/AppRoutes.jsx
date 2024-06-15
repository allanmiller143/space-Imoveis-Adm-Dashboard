import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import LoginPage from '../Pages/Login/Login';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/dash" element={<Home/>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
