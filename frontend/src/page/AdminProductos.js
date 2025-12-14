import React, { useState, useEffect } from "react";
import API_URL from '../utils/apiconfig.js'; // Asegúrate de tener esto, si no, comenta la importación
import "../css/style.css";

const AdminProductos = () => {
    // Estado para la lista de productos
    const [products, setProducts] = useState([]);

    // Estado para el formulario
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        stock: '',
        image: ''
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [message, setMessage] = useState({ text: '', type: '' });

    // --- CARGAR PRODUCTOS ---
    const fetchProducts = async () => {
        // MODO PRUEBA (Para ver diseño inmediatamente)
        const mockData = [
            { id: 1, name: "PC Gamer RTX 4090", price: 1500000, category: "Computadores", stock: 5, image: "https://via.placeholder.com/100" },
            { id: 2, name: "Teclado Mecánico", price: 45000, category: "Periféricos", stock: 12, image: "https://via.placeholder.com/100" }
        ];
        setProducts(mockData);

        // MODO REAL (Descomentar cuando conectes Java)
        /*
        try {
          const res = await fetch(`${API_URL}/api/products`);
          const data = await res.json();
          setProducts(data);
        } catch (error) {
          console.error("Error al cargar productos", error);
        }
        */
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // --- MANEJO DE FORMULARIO ---
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // --- AGREGAR O EDITAR ---
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación básica
        if (!formData.name || !formData.price || !formData.stock) {
            setMessage({ text: '❌ Por favor completa los campos obligatorios.', type: 'error' });
            return;
        }

        // SIMULACIÓN DE LÓGICA (Reemplazar con Fetch real)
        if (isEditing) {
            // Lógica Editar
            setProducts(products.map(p => p.id === editId ? { ...formData, id: editId, price: Number(formData.price), stock: Number(formData.stock) } : p));
            setMessage({ text: '✅ Producto actualizado correctamente.', type: 'success' });
        } else {
            // Lógica Agregar
            const newProduct = { ...formData, id: Date.now(), price: Number(formData.price), stock: Number(formData.stock) };
            setProducts([...products, newProduct]);
            setMessage({ text: '✅ Producto agregado al arsenal.', type: 'success' });
        }

        // Resetear form
        setFormData({ name: '', price: '', category: '', stock: '', image: '' });
        setIsEditing(false);
        setEditId(null);

        // Limpiar mensaje después de 3 seg
        setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    };

    // --- PREPARAR EDICIÓN ---
    const handleEdit = (product) => {
        setFormData(product);
        setIsEditing(true);
        setEditId(product.id);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Subir al formulario
    };

    // --- ELIMINAR ---
    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de eliminar este ítem del inventario?")) return;

        // SIMULACIÓN (Reemplazar con Fetch DELETE real)
        setProducts(products.filter(p => p.id !== id));
        setMessage({ text: '🗑️ Producto eliminado.', type: 'success' });
        setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    };

    const formatPrice = (price) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);

    return (
        <main className="admin-page">

            {/* HERO BANNER ADMIN */}
            <section className="admin-hero">
                <h1 className="neon-text">⚙️ GESTIÓN DE INVENTARIO</h1>
                <p>Control total sobre el arsenal de Level-Up.</p>
            </section>

            <div className="admin-container">

                {/* SECCIÓN 1: FORMULARIO */}
                <div className="admin-card">
                    <div className="card-header">
                        <h2>{isEditing ? '✏️ Editar Producto' : '✚ Agregar Nuevo Producto'}</h2>
                    </div>

                    {message.text && (
                        <div className={`admin-alert ${message.type}`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="admin-form">
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Nombre del Producto</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Ej: Mouse Gamer X1" />
                            </div>

                            <div className="form-group">
                                <label>Precio (CLP)</label>
                                <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Ej: 50000" />
                            </div>

                            <div className="form-group">
                                <label>Categoría</label>
                                <select name="category" value={formData.category} onChange={handleChange} className="admin-select">
                                    <option value="">Selecciona una categoría...</option>
                                    <option value="Computadores">Computadores</option>
                                    <option value="Periféricos">Periféricos</option>
                                    <option value="Monitores">Monitores</option>
                                    <option value="Componentes">Componentes</option>
                                    <option value="Sillas">Sillas Gamer</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Stock Disponible</label>
                                <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="Ej: 10" />
                            </div>
                        </div>

                        <div className="form-group full-width">
                            <label>URL de Imagen</label>
                            <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="https://..." />
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn-admin-save">
                                {isEditing ? 'ACTUALIZAR DATOS' : 'GUARDAR PRODUCTO'}
                            </button>

                            {isEditing && (
                                <button type="button" className="btn-admin-cancel" onClick={() => {
                                    setIsEditing(false);
                                    setFormData({ name: '', price: '', category: '', stock: '', image: '' });
                                }}>
                                    CANCELAR
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* SECCIÓN 2: LISTA DE PRODUCTOS */}
                <div className="admin-card">
                    <div className="card-header">
                        <h2>📦 Inventario Actual</h2>
                        <span className="badge-count">{products.length} Items</span>
                    </div>

                    <div className="table-responsive">
                        <table className="gamer-table">
                            <thead>
                            <tr>
                                <th>IMG</th>
                                <th>NOMBRE</th>
                                <th>CATEGORÍA</th>
                                <th>PRECIO</th>
                                <th>STOCK</th>
                                <th>ACCIONES</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="empty-row">No hay productos en el inventario.</td>
                                </tr>
                            ) : (
                                products.map((p) => (
                                    <tr key={p.id}>
                                        <td>
                                            <div className="table-img">
                                                <img src={p.image || 'https://via.placeholder.com/50'} alt="mini" />
                                            </div>
                                        </td>
                                        <td className="fw-bold">{p.name}</td>
                                        <td><span className="category-badge">{p.category}</span></td>
                                        <td className="price-text">{formatPrice(p.price)}</td>
                                        <td>
                        <span className={`stock-badge ${p.stock < 5 ? 'low' : 'ok'}`}>
                          {p.stock}
                        </span>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="btn-icon edit" onClick={() => handleEdit(p)} title="Editar">✏️</button>
                                                <button className="btn-icon delete" onClick={() => handleDelete(p.id)} title="Eliminar">🗑️</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </main>
    );
};

export default AdminProductos;