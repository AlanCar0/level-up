import { jwtDecode } from "jwt-decode";
import api from "./api"; // Importamos tu configuración de Axios

// Función para Login
export const login = async (credentials) => {
    // Ajusta la URL '/auth/login' si tu backend tiene otra ruta
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

// Función para Registro
export const register = async (userData) => {
    // Ajusta la URL '/auth/register' si tu backend tiene otra ruta
    const response = await api.post('/auth/register', userData);
    return response.data;
};

// Obtener datos del token
export const getPayload = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        // Verificar expiración (exp viene en segundos, Date.now en ms)
        if (decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem('token');
            return null;
        }
        return decoded;
    } catch (error) {
        return null;
    }
};

// Verificar si es Admin
export const isAdmin = () => {
    const payload = getPayload();
    return payload && payload.role === 'ROLE_ADMIN';
};

// Verificar si es Usuario logueado
export const isUser = () => {
    const payload = getPayload();
    return payload != null;
};