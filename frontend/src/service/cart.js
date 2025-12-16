import api from './api';

export const getCart = async () => {
    const response = await api.get('/cart');
    return response.data; // Devuelve CartDto
};

export const addToCart = async (productId, quantity) => {
    // Coincide con @PostMapping("/add/{productId}") y @RequestParam int quantity
    const response = await api.post(`/cart/add/${productId}?quantity=${quantity}`);
    return response.data;
};

export const removeItem = async (itemId) => {
    // Coincide con @DeleteMapping("/item/{itemId}")
    const response = await api.delete(`/cart/item/${itemId}`);
    return response.data;
};