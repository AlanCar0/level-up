import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ role }) => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token) return <Navigate to="/login" />;

    if (role && user?.rol !== role) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
