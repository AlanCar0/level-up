import React, { useState, useEffect } from "react";
import { getAllProducts } from '../service/product';
import { addToCart as apiAddToCart, getCart, removeItem } from '../service/cart';
import { checkout } from '../service/orders';
import { isUser } from '../service/auth';
import "../css/style.css";

const Products = () => {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // --- CARGAR PRODUCTOS (BACKEND) ---
    const fetchProducts = async () => {
        try {
            const data = await getAllProducts();
            setProducts(data);
        } catch (err) {
            console.error("Error cargando productos:", err);
        } finally {
            setLoading(false);
        }
    };

    // --- CARGAR CARRITO (BACKEND) ---
    const fetchCart = async () => {
        if (!isUser()) return;

        try {
            const cartDto = await getCart();
            if (cartDto && cartDto.items) {
                const mappedItems = cartDto.items.map(item => ({
                    id: item.productId,
                    cartItemId: item.id,
                    name: item.productName,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image || "https://via.placeholder.com/300"
                }));
                setCart(mappedItems);
            } else {
                setCart([]); // Carrito vacío
            }
        } catch (error) {
            console.log("Error cargando carrito:", error);
            setCart([]);
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
            await apiAddToCart(product.id, 1);
            await fetchCart(); // ✅ Recargar carrito después de agregar
            alert('✅ Producto agregado al carro');
        } catch (error) {
            console.error("Error agregando al carrito:", error);
            alert('❌ Error al agregar producto');
        }
    };

    const removeFromCart = async (cartItemId) => {
        try {
            await removeItem(cartItemId);
            await fetchCart(); // ✅ Recargar carrito después de eliminar
        } catch (error) {
            console.error("Error eliminando del carrito:", error);
            alert('❌ Error al eliminar producto');
        }
    };

    const handleClearCart = () => {
        // Esto solo vacía el estado local, no el backend
        // Si quieres vaciar el backend, necesitas un endpoint /cart/clear
        setCart([]);
        setIsCartOpen(false);
    };

    const getTotalItems = () => cart.reduce((total, item) => total + item.quantity, 0);
    const getTotalPrice = () => cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const formatPrice = (price) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);

    const handleCheckout = async () => {
        if (cart.length === 0) {
            alert('❌ El carrito está vacío');
            return;
        }

        if (!isUser()) {
            alert('❌ Debes iniciar sesión para comprar');
            return;
        }

        try {
            const orden = await checkout();
            alert(`✅ Compra exitosa! Orden #${orden.id}`);
            setCart([]); // Vaciar carrito local
            setIsCartOpen(false);
            fetchProducts(); // Actualizar stock
            fetchCart(); // Recargar carrito (debería estar vacío ahora)
        } catch (error) {
            console.error("Error en checkout:", error);
            alert('❌ Error al procesar la compra');
        }
    };

    if (loading) {
        return <div className="loading">Cargando productos...</div>;
    }

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
                                    <div className="card-overlay">
                                        {isOutOfStock
                                            ? <span className="badge-agotado">AGOTADO</span>
                                            : availableStock <= 3
                                                ? <span className="badge-low">¡ÚLTIMAS {availableStock}!</span>
                                                : <span className="badge-ok">STOCK: {availableStock}</span>
                                        }
                                    </div>

                                    <div className="card-image-box">
                                        <img src={product.image || "https://via.placeholder.com/300"} alt={product.name} />
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
                                            disabled={isOutOfStock || !isUser()}
                                        >
                                            {!isUser() ? 'INICIA SESIÓN' : 
                                             isOutOfStock ? 'SIN STOCK' : 'AÑADIR AL CARRO ✚'}
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
                                                    <span className="cart-item-price-unit">{formatPrice(item.price)} c/u</span>
                                                </div>
                                                <div className="cart-controls-mini">
                                                    <span>Cant: {item.quantity}</span>
                                                </div>
                                                <div className="cart-item-price">
                                                    {formatPrice(item.price * item.quantity)}
                                                </div>
                                                <button 
                                                    onClick={() => removeFromCart(item.cartItemId)} 
                                                    className="btn-trash"
                                                    title="Eliminar"
                                                >
                                                    ❌
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="cart-total">
                                        <h3>Total: <span className="neon-text">{formatPrice(getTotalPrice())}</span></h3>
                                    </div>
                                    <div className="cart-actions">
                                        <button className="btn-vaciar-carrito" onClick={handleClearCart}>
                                            Vaciar Carrito
                                        </button>
                                        <button className="btn-comprar" onClick={handleCheckout}>
                                            CONFIRMAR COMPRA
                                        </button>
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