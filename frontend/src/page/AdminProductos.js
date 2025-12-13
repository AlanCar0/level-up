import React, { useEffect, useState, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import API_URL from '../utils/apiconfig';

const AdminProductos = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('token');

    // 🔹 Cargar productos
    const cargarProductos = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/productos`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Error al cargar productos');

            const data = await response.json();
            setProductos(data);
        } catch (error) {
            alert('No se pudieron cargar los productos');
        } finally {
            setLoading(false);
        }
    }, [token]); // Dependencia de token, ya que se usa en la función

    // 🔹 Eliminar producto
    const eliminarProducto = async (id) => {
        if (!window.confirm('¿Eliminar este producto?')) return;

        try {
            const response = await fetch(`${API_URL}/productos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Error al eliminar');

            setProductos(productos.filter(p => p.id !== id));
        } catch (error) {
            alert('No se pudo eliminar el producto');
        }
    };

    useEffect(() => {
        cargarProductos();
    }, [cargarProductos]); // Asegura que `cargarProductos` se ejecute correctamente

    if (loading) {
        return <div className="text-center mt-5">Cargando productos...</div>;
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Panel Administrador - Productos</h2>

            <div className="mb-3 text-end">
                <button className="btn btn-success">
                    + Nuevo Producto
                </button>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Categoría</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>

                    <tbody>
                    {productos.map(p => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.nombre}</td>
                            <td>${p.precio}</td>
                            <td>
                                {p.stock === 0
                                    ? <span className="badge bg-danger">Sin stock</span>
                                    : p.stock}
                            </td>
                            <td>{p.categoria}</td>
                            <td>
                                <button className="btn btn-sm btn-primary me-2">
                                    Editar
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => eliminarProducto(p.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default AdminProductos;
