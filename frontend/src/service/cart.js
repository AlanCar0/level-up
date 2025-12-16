import api from './api';

export const getCart = async () => {
    const response = await api.get('/cart');
    return response.data;
};

export const addToCart = async (productId, quantity = 1) => {
    const response = await api.post(`/cart/add/${productId}?quantity=${quantity}`);
    return response.data;
};

export const removeItem = async (itemId) => {
    const response = await api.delete(`/cart/item/${itemId}`);
    return response.data;
};