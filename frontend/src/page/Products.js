import React, { useState, useEffect } from "react";
import API_URL from '../utils/apiconfig.js'; // Importación añadida
import "../css/style.css";

const Products = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState([]); // Ahora inicia vacío

  // --- INICIO CAMBIO BACKEND: Cargar productos reales ---
  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        console.log("Productos cargados desde EC2:", data);
        setProducts(data);
      })
      .catch(err => console.error("Error cargando productos:", err));
  }, []);
  // --- FIN CAMBIO BACKEND ---

  // Cargar carrito desde localStorage al iniciar (Tu lógica original)
  useEffect(() => {
    const savedCart = localStorage.getItem('levelUpCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie (Tu lógica original)
  useEffect(() => {
    localStorage.setItem('levelUpCart', JSON.stringify(cart));
  }, [cart]);

  // Obtener stock disponible para un producto
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
      alert('❌ No hay stock disponible de este producto');
      return;
    }

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        // Verificar que no exceda el stock
        if (existingItem.quantity >= product.stock) {
          alert('❌ Has alcanzado el stock máximo disponible');
          return prevCart;
        }
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
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
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(price);
  };

  // --- INICIO CAMBIO BACKEND: Procesar compra real ---
  const handleCheckout = async () => {
    if (cart.length === 0) return;
    
    // Obtener token (opcional si implementaste seguridad)
    const token = localStorage.getItem('token');

    // Preparar el JSON que pide tu Backend Java
    const compraData = {
        items: cart.map(item => ({
            productoId: item.id,
            cantidad: item.quantity
        }))
    };

    try {
        const response = await fetch(`${API_URL}/api/compra`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
            },
            body: JSON.stringify(compraData)
        });

        if (response.ok) {
            alert(`✅ Compra realizada por ${formatPrice(getTotalPrice())}\n¡Gracias por tu compra! (Stock actualizado en Oracle)`);
            setCart([]);
            // Recargar la página para ver el stock actualizado
            window.location.reload();
        } else {
            const errorText = await response.text();
            alert('❌ Error al comprar: ' + errorText);
        }
    } catch (error) {
        console.error(error);
        alert('❌ Error de conexión con el servidor.');
    }
  };
  // --- FIN CAMBIO BACKEND ---

  return (
    <>
      <header>
        <h1 className="titulo">🎮 Level-Up Gamer 👾</h1>
        <nav>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/productos">Productos</a></li>
            <li><a href="/contacto">Contacto</a></li>
          </ul>
        </nav>
        
        {/* Contenedor para carrito y botones de autenticación */}
        <div className="header-right-section">
          {/* Botón del Carrito */}
          <button 
            className="btn-carrito"
            onClick={() => setIsCartOpen(true)}
          >
            🛒 Carrito ({getTotalItems()})
          </button>
          
          {/* Contenedor para botones de autenticación */}
          <div className="auth-buttons">
            {/* Botón de Inicio de Sesión */}
            <button 
              className="btn-login"
              onClick={() => { window.location.href = '/login'; }}
            >
              🔐 Iniciar Sesión
            </button>
            
            {/* Botón de Registro */}
            <button 
              className="btn-register"
              onClick={() => { window.location.href = '/register'; }}
            >
              🎯 Registrarse
            </button>
          </div>
        </div>
      </header>

      <main>
        <section>
          <h2>Nuestros Productos</h2>
          <div className="productos-container">
            {products.map(product => {
              const availableStock = getAvailableStock(product.id);
              const isOutOfStock = availableStock <= 0;
              
              return (
                <div key={product.id} className={`producto ${isOutOfStock ? 'producto-agotado' : ''}`}>
                  <div className="producto-imagen">
                    <img src={product.image} alt={product.name} />
                    {isOutOfStock && <div className="stock-badge agotado">AGOTADO</div>}
                    {availableStock > 0 && availableStock <= 3 && (
                      <div className="stock-badge poco-stock">ÚLTIMAS {availableStock}</div>
                    )}
                  </div>
                  <h3>{product.name}</h3>
                  <p className="producto-precio">{formatPrice(product.price)}</p>
                  <p className="producto-categoria">{product.category}</p>
                  <div className="producto-stock">
                    Stock disponible: <span className={availableStock === 0 ? 'stock-cero' : 'stock-disponible'}>
                      {availableStock}
                    </span>
                  </div>
                  <button 
                    className={`btn-agregar-carrito ${isOutOfStock ? 'btn-deshabilitado' : ''}`}
                    onClick={() => addToCart(product)}
                    disabled={isOutOfStock}
                  >
                    {isOutOfStock ? 'SIN STOCK' : 'Agregar al Carrito'}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Popup del Carrito */}
        {isCartOpen && (
          <div className="overlay active">
            <div className="cart-popup">
              <button 
                className="btn-close-popup"
                onClick={() => setIsCartOpen(false)}
              >
                &times;
              </button>
              <h2>🛒 Tu Carrito de Compras</h2>
              
              {cart.length === 0 ? (
                <p className="carrito-vacio">Tu carrito está vacío</p>
              ) : (
                <>
                  <div className="cart-items">
                    {cart.map(item => {
                      const availableStock = getAvailableStock(item.id) + item.quantity;
                      
                      return (
                        <div key={item.id} className="cart-item">
                          <div className="cart-item-info">
                            <span className="cart-item-name">{item.name}</span>
                            <span className="cart-item-price">{formatPrice(item.price)}</span>
                          </div>
                          
                          <div className="cart-item-stock">
                            Stock total: {availableStock}
                          </div>
                          
                          <div className="cart-item-controls">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="btn-cantidad"
                            >
                              -
                            </button>
                            <span className="cart-item-quantity">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="btn-cantidad"
                              disabled={item.quantity >= availableStock}
                            >
                              +
                            </button>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="btn-eliminar"
                            >
                              🗑️
                            </button>
                          </div>
                          <div className="cart-item-total">
                            Total: {formatPrice(item.price * item.quantity)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="cart-total">
                    <h3>Total: {formatPrice(getTotalPrice())}</h3>
                  </div>
                  
                  <div className="cart-actions">
                    <button 
                      className="btn-vaciar-carrito"
                      onClick={() => setCart([])}
                    >
                      Vaciar Carrito
                    </button>
                    <button 
                      className="btn-comprar"
                      onClick={handleCheckout}
                    >
                      Proceder al Pago
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