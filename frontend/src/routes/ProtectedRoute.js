import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ role }) => {
    const token = localStorage.getItem('token');
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    // 🔒 No logueado
    if (!token || !usuario) {
        return <Navigate to="/login" replace />;
    }

    // 🚫 Rol incorrecto
    if (role && usuario.rol !== role) {
        return (
            <Navigate
                to="/"
                replace
                state={{
                    error: '⛔ Acceso denegado: no tienes permisos de administrador'
                }}
            />
        );
    }

    // ✅ Acceso permitido
    return <Outlet />;
};

export default ProtectedRoute;
