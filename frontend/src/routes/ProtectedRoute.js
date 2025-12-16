import React from 'react';
import { Navigate } from 'react-router-dom';
import { getPayload } from '../service/auth'; // CORREGIDO: Apunta a service, no utils

const ProtectedRoute = ({ children, requireAdmin }) => {
    const user = getPayload(); // Decodifica el token

    // 1. Si no hay token o expiró -> Login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // 2. Si la ruta requiere Admin y el token dice que no es Admin -> Productos (o Home)
    if (requireAdmin && user.role !== 'ROLE_ADMIN') {
        return <Navigate to="/productos" replace />;
    }

    // 3. Si pasa las validaciones, renderiza el componente
    return children;
};

export default ProtectedRoute;