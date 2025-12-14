import React, { useState, useEffect } from "react";
import API_URL from '../utils/apiconfig.js';
import "../css/style.css";

const Products = () => {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [products, setProducts] = useState([]);

    const fetchProducts = () => {
        // --- MODO PRUEBA: DATOS FALSOS (Activo) ---
        console.log("Cargando datos falsos para diseño...");
        const datosDePrueba = [
            {
                id: 1,
                name: "PC Gamer RTX 4090",
                price: 1500000,
                category: "Computadores",
                stock: 5,
                image: "https://via.placeholder.com/300/000000/39FF14?text=PC+Gamer"
            },
            {
                id: 2,
                name: "Teclado Mecánico RGB",
                price: 45000,
                category: "Periféricos",
                stock: 10,
                image: "https://via.placeholder.com/300/000000/39FF14?text=Teclado"
            },
            {
                id: 3,
                name: "Mouse Pro Wireless",
                price: 35000,
                category: "Periféricos",
                stock: 2,
                image: "https://via.placeholder.com/300/000000/39FF14?text=Mouse"
            },
            {
                id: 4,
                name: "Monitor 144Hz",
                price: 250000,
                category: "Monitores",
                stock: 0,
                image: "https://images-ext-1.discordapp.net/external/0axBLKciSJRfT-oKu0jDR-mnjCKdgYL-3qBynU4C-TU/%3Fnull/https/i5.walmartimages.cl/asr/4065a6fb-9c6a-4fbf-a7ff-1797ba3f422b.7d7422b76c7a48f06b1f171749b2ef5f.jpeg?format=webp&width=960&height=960"
            }
        ];
        setProducts(datosDePrueba);

        // --- MODO REAL: BACKEND (Descomentar cuando conectes Java) ---
        /*
        fetch(`${API_URL}/api/products`)
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error("Error cargando productos:", err));
        */
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        const savedCart = localStorage.getItem('levelUpCart');
        if (savedCart) setCart(JSON.parse(savedCart));
    }, []);

    useEffect(() => {
        localStorage.setItem('levelUpCart', JSON.stringify(cart));
    }, [cart]);

    const getAvailableStock = (productId) => {
        const product = products.find(p => p.id === productId);
        const cartItem = cart.find(item => item.id === productId);
        if (!product) return 0;
        const stockUsed = cartItem ? cartItem.quantity : 0;
        return product.stock - stockUsed;
    };

    const addToCart = (product) => {
        const availableStock = getAvailableStock(product.id);
        if (availableStock <= 0) {
            alert('❌ No hay stock disponible');
            return;
        }

        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                if (existingItem.quantity >= product.stock) {
                    alert('❌ Stock máximo alcanzado');
                    return prevCart;
                }
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(productId);
            return;
        }
        const product = products.find(p => p.id === productId);
        if (newQuantity > product.stock) {
            alert(`❌ Solo hay ${product.stock} unidades disponibles`);
            return;
        }
        setCart(prevCart =>
            prevCart.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item)
        );
    };

    const getTotalItems = () => cart.reduce((total, item) => total + item.quantity, 0);
    const getTotalPrice = () => cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const formatPrice = (price) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);

    const handleCheckout = async () => {
        if (cart.length === 0) return;

        // MODO PRUEBA (Borrar al conectar Backend)
        alert(`✅ Compra simulada por ${formatPrice(getTotalPrice())}`);
        setCart([]);
        setIsCartOpen(false);
        fetchProducts();
        return;

        // MODO REAL (Descomentar al conectar Backend)
        /*
        const token = localStorage.getItem('token');
        const compraData = { items: cart.map(item => ({ productoId: item.id, cantidad: item.quantity })) };
        try {
            const response = await fetch(`${API_URL}/api/compra`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': token ? `Bearer ${token}` : '' },
                body: JSON.stringify(compraData)
            });
            if (response.ok) {
                alert(`✅ Compra exitosa por ${formatPrice(getTotalPrice())}`);
                setCart([]);
                setIsCartOpen(false);
                fetchProducts();
            } else {
                const errorText = await response.text();
                alert('❌ Error: ' + errorText);
            }
        } catch (error) {
            console.error(error);
            alert('❌ Error de conexión');
        }
        */
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
                                        <p className="category-tag">{product.category}</p>
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
                                            <div key={item.id} className="cart-item">
                                                <div className="cart-item-info">
                                                    <span className="cart-item-name">{item.name}</span>
                                                </div>
                                                <div className="cart-controls-mini">
                                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                                    <span>{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        disabled={item.quantity >= (getAvailableStock(item.id) + item.quantity)}
                                                    >+</button>
                                                </div>
                                                <div className="cart-item-price">
                                                    {formatPrice(item.price * item.quantity)}
                                                </div>
                                                <button onClick={() => removeFromCart(item.id)} className="btn-trash">❌</button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="cart-total">
                                        <h3>Total: <span className="neon-text">{formatPrice(getTotalPrice())}</span></h3>
                                    </div>
                                    <div className="cart-actions">
                                        <button className="btn-vaciar-carrito" onClick={() => setCart([])}>Vaciar</button>
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