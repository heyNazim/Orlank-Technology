import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateComponent = () => {
  const auth = localStorage.getItem('auth');

  // Check if auth exists and equals 'user'
  return auth === 'user' ? <Outlet /> : <Navigate to='/signup' />;
};

export default PrivateComponent;
