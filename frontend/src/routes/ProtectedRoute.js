import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAdmin, isUser } from '../service/auth';

// Para rutas de usuario normal
export const ProtectedRoute = ({ children }) => {
    if (!isUser()) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

// Para rutas de admin
export const AdminRoute = ({ children }) => {
    if (!isAdmin()) {
        return <Navigate to="/" replace />;
    }
    return children;
};