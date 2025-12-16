import api from './api';

export const getAllProducts = async () => {
    const response = await api.get('/products');
    return response.data;
};

export const createProduct = async (productData) => {
    const response = await api.post('/products', productData);
    return response.data;
};

export const deleteProduct = async (id) => {
    await api.delete(`/products/${id}`);
};