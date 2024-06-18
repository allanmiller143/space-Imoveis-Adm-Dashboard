/* eslint-disable no-unused-vars */
import React from 'react';
import Home from '../Pages/Home/Home';
import LoginPage from '../Pages/Login/Login';
import PrivateRoute from './PrivateRoute';
import { BrowserRouter as Router, createBrowserRouter,RouterProvider } from 'react-router-dom';

const AppRoutes = () => {

  
  const PrivateRoutes = [
    {
      path: '/',
      element: <PrivateRoute/>,
      children: [
        {path: '/dash' ,element : <Home/>},
      ]
    }
  ];

  const notAuthenticatedRoutes = [
    {path: '/',element: <LoginPage />,},
  ];

  const router = createBrowserRouter([
    ...notAuthenticatedRoutes,
    ...PrivateRoutes
  ]);
  
  return <RouterProvider router={router} />;

};

export default AppRoutes;
