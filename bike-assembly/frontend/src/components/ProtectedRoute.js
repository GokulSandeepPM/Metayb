import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role, requiredRole }) => {
  if (!localStorage.getItem('token') || !localStorage.getItem('role')) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
