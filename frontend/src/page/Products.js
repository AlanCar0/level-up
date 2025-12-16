import React, { useState, useEffect } from "react";
// IMPORTAMOS SERVICIOS
import { getAllProducts } from '../service/product';
import { addToCart as apiAddToCart, getCart, removeItem } from '../service/cart';
import { checkout } from '../service/orders';
import { isUser } from '../service/auth';
import "../css/style.css";

const Products = () => {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [products, setProducts] = useState([]);

    // --- CARGAR PRODUCTOS (BACKEND) ---
    const fetchProducts = async () => {
        try {
            const data = await getAllProducts();
            setProducts(data);
        } catch (err) {
            console.error("Error cargando productos:", err);
        }
    };

    // --- CARGAR CARRITO (BACKEND) ---
    const fetchCart = async () => {
        // Solo intentamos cargar si el usuario está logueado
        if (!isUser()) return;

        try {
            const cartDto = await getCart();
            // Mapeamos los datos del DTO para que calcen con tu diseño visual
            const mappedItems = cartDto.items.map(item => ({
                id: item.productId,        // ID del producto para lógica de stock
                cartItemId: item.id,       // ID del item en el carro para borrar
                name: item.productName,
                price: item.price,
                quantity: item.quantity,
                image: item.image || "https://via.placeholder.com/300" // Fallback si no viene imagen
            }));
            setCart(mappedItems);
        } catch (error) {
            console.log("Carrito vacío o sesión expirada");
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    const getAvailableStock = (productId) => {
        const product = products.find(p => p.id === productId);
        const cartItem = cart.find(item => item.id === productId);
        if (!product) return 0;
        const stockUsed = cartItem ? cartItem.quantity : 0;
        return product.stock - stockUsed;
    };

    const addToCart = async (product) => {
        if (!isUser()) {
            alert('❌ Debes iniciar sesión para comprar');
            return;
        }
        
        const availableStock = getAvailableStock(product.id);
        if (availableStock <= 0) {
            alert('❌ No hay stock disponible');
            return;
        }

        try {
            // Llamada al backend
            await apiAddToCart(product.id, 1);
            // Actualizamos la vista recargando el carrito
            fetchCart();
            alert('✅ Producto agregado al carro');
        } catch (error) {
            console.error(error);
            alert('❌ Error al agregar producto');
        }
    };

    const removeFromCart = async (cartItemId) => {
        try {
            await removeItem(cartItemId);
            fetchCart();
        } catch (error) {
            console.error(error);
        }
    };

    // Nota: El backend básico no tiene endpoint de update quantity (+ / -)
    // Para no romper tu UI, dejamos los botones pero con alerta o desactivados
    const updateQuantity = (productId, newQuantity) => {
        alert("Para cambiar cantidad, elimina el item o agrega más desde el catálogo.");
    };

    const getTotalItems = () => cart.reduce((total, item) => total + item.quantity, 0);
    const getTotalPrice = () => cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const formatPrice = (price) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);

    const handleCheckout = async () => {
        if (cart.length === 0) return;

        try {
            const orden = await checkout();
            alert(`✅ Compra exitosa! Orden #${orden.id}`);
            setCart([]);
            setIsCartOpen(false);
            fetchProducts(); // Actualizar stock visualmente
        } catch (error) {
            console.error(error);
            alert('❌ Error al procesar la compra.');
        }
    };

    return (
        <>
            <main className="products-page">
                {/* HERO BANNER GAMER */}
                <section className="products-hero">
                    <div className="hero-content">
                        <h1 className="neon-text">Arsenal Gamer</h1>
                        <p>Los mejores productos para tu Setup</p>
                    </div>
                </section>

                {/* CATÁLOGO */}
                <section className="catalog-section">
                    <div className="catalog-header">
                        <h2>🔥 Catálogo Disponible</h2>
                    </div>

                    <div className="productos-container">
                        {products.map(product => {
                            const availableStock = getAvailableStock(product.id);
                            const isOutOfStock = availableStock <= 0;

                            return (
                                <div key={product.id} className={`gamer-product-card ${isOutOfStock ? 'card-disabled' : ''}`}>
                                    {/* Badge Stock */}
                                    <div className="card-overlay">
                                        {isOutOfStock
                                            ? <span className="badge-agotado">AGOTADO</span>
                                            : availableStock <= 3
                                                ? <span className="badge-low">¡ÚLTIMAS {availableStock}!</span>
                                                : <span className="badge-ok">STOCK: {availableStock}</span>
                                        }
                                    </div>

                                    <div className="card-image-box">
                                        <img src={product.image} alt={product.name} />
                                    </div>

                                    <div className="card-info">
                                        <h3>{product.name}</h3>
                                        <p className="category-tag">{product.category || 'General'}</p>
                                        <div className="price-row">
                                            <span className="price-tag">{formatPrice(product.price)}</span>
                                        </div>

                                        <button
                                            className={`btn-add-gamer ${isOutOfStock ? 'disabled' : ''}`}
                                            onClick={() => addToCart(product)}
                                            disabled={isOutOfStock}
                                        >
                                            {isOutOfStock ? 'SIN STOCK' : 'AÑADIR AL CARRO ✚'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* BOTÓN FLOTANTE */}
                <button className="cart-float-btn" onClick={() => setIsCartOpen(true)}>
                    🛒 {getTotalItems() > 0 && <span className="cart-count">{getTotalItems()}</span>}
                </button>

                {/* POPUP CARRITO */}
                {isCartOpen && (
                    <div className="overlay active">
                        <div className="cart-popup">
                            <button className="btn-close-popup" onClick={() => setIsCartOpen(false)}>&times;</button>
                            <h2 className="neon-text">🛒 TU DROP</h2>

                            {cart.length === 0 ? (
                                <p className="carrito-vacio">Tu inventario está vacío.</p>
                            ) : (
                                <>
                                    <div className="cart-items">
                                        {cart.map(item => (
                                            <div key={item.cartItemId} className="cart-item">
                                                <div className="cart-item-info">
                                                    <span className="cart-item-name">{item.name}</span>
                                                </div>
                                                <div className="cart-controls-mini">
                                                    <span>Cant: {item.quantity}</span>
                                                </div>
                                                <div className="cart-item-price">
                                                    {formatPrice(item.price * item.quantity)}
                                                </div>
                                                <button onClick={() => removeFromCart(item.cartItemId)} className="btn-trash">❌</button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="cart-total">
                                        <h3>Total: <span className="neon-text">{formatPrice(getTotalPrice())}</span></h3>
                                    </div>
                                    <div className="cart-actions">
                                        <button className="btn-vaciar-carrito" onClick={() => setCart([])}>Ocultar</button>
                                        <button className="btn-comprar" onClick={handleCheckout}>CONFIRMAR COMPRA</button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </main>

            <footer>
                <p>© 2025 - Level-Up Gamer | Equipo FullStack 2 | Alan - Kareem</p>
            </footer>
        </>
    );
};

export default Products;