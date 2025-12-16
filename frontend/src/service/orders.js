import api from './api';

export const checkout = async () => {
    // Coincide con @PostMapping("/checkout")
    const response = await api.post('/orders/checkout');
    return response.data;
};