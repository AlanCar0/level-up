import { jwtDecode } from "jwt-decode";
import api from "./api";

// Función para Login
export const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        
        // ✅ Guardar también usuario decodificado
        const decoded = jwtDecode(response.data.token);
        localStorage.setItem('user', JSON.stringify({
            id: decoded.userId,
            email: decoded.sub,
            role: decoded.role
        }));
    }
    return response.data;
};

// Función para Registro
export const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
};

// Obtener datos del token
export const getPayload = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem('token');
            localStorage.removeItem('user'); // ✅ Limpiar también usuario
            return null;
        }
        return decoded;
    } catch (error) {
        return null;
    }
};

// Obtener usuario desde localStorage
export const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
        return JSON.parse(userStr);
    } catch {
        return null;
    }
};

// Verificar si es Admin
export const isAdmin = () => {
    const user = getCurrentUser();
    return user && user.role === 'ROLE_ADMIN';
};

// Verificar si es Usuario logueado
export const isUser = () => {
    return getCurrentUser() != null;
};

// Logout
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};