import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from '../utils/apiconfig'; // Importamos la config
import "../css/style.css";

const Products = () => {
  const [products, setProducts] = useState([]); // Empieza vacío, se llena desde AWS
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  // 1. CARGAR PRODUCTOS DESDE AWS AL INICIAR
  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        console.log("Productos cargados:", data);
        setProducts(data);
      })
      .catch(err => console.error("Error cargando productos:", err));
  }, []);

  // Formato de moneda CLP
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(price);
  };

  // Agregar al carrito
  const addToCart = (product) => {
    if (product.stock <= 0) {
        alert("Sin stock disponible");
        return;
    }
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    alert(`Agregado: ${product.name}`);
  };

  // Eliminar del carrito
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Calcular total
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // PROCESAR COMPRA (CONECTADO AL BACKEND)
  const handleCheckout = async () => {
    if (cart.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    const token = localStorage.getItem('token');
    
    // Preparar datos para Java
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
            alert("✅ ¡Compra realizada con éxito! \nStock actualizado en Oracle.");
            setCart([]);
            setIsCartOpen(false);
            // Recargar productos para ver el stock actualizado
            window.location.reload();
        } else {
            const errorMsg = await response.text();
            alert("❌ Error: " + errorMsg);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error de conexión con el servidor");
    }
  };

  return (
    <>
      <header>
        <h1 className="titulo">🎮 Catálogo Level-Up 👾</h1>
        <div className="header-right-section">
            <button 
              className="cart-icon-btn"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              🛒 <span className="cart-count">{cart.reduce((a, c) => a + c.quantity, 0)}</span>
            </button>
            <button className="secondary-btn" onClick={() => navigate('/')}>
               Inicio
            </button>
        </div>
      </header>

      <main className="products-container">
        {products.length === 0 ? (
            <p style={{textAlign: "center", marginTop: "2rem"}}>Cargando productos desde AWS...</p>
        ) : (
            <div className="products-grid">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image-container">
                    <img src={product.image} alt={product.name} className="product-image" />
                    {product.stock === 0 && <div className="no-stock-overlay">AGOTADO</div>}
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="category-tag">{product.category}</p>
                    <div className="price-stock">
                      <span className="price">{formatPrice(product.price)}</span>
                      <span className={`stock ${product.stock < 5 ? 'low' : ''}`}>
                        Stock: {product.stock}
                      </span>
                    </div>
                    <button 
                      onClick={() => addToCart(product)}
                      className="add-to-cart-btn"
                      disabled={product.stock === 0}
                    >
                      {product.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
        )}

        {/* Modal del Carrito */}
        {isCartOpen && (
          <div className="cart-modal-overlay">
            <div className="cart-modal">
              <div className="cart-header">
                <h2>Tu Carrito</h2>
                <button onClick={() => setIsCartOpen(false)} className="close-btn">×</button>
              </div>
              
              {cart.length === 0 ? (
                <p className="empty-cart-msg">No tienes productos seleccionados.</p>
              ) : (
                <>
                  <div className="cart-items">
                    {cart.map(item => (
                      <div key={item.id} className="cart-item">
                        <div className="cart-item-info">
                          <h4>{item.name}</h4>
                          <p>Cant: {item.quantity} x {formatPrice(item.price)}</p>
                        </div>
                        <div className="cart-item-actions">
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="btn-eliminar"
                            >
                              🗑️
                            </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="cart-total">
                    <h3>Total: {formatPrice(getTotalPrice())}</h3>
                  </div>
                  
                  <div className="cart-actions">
                    <button 
                      className="btn-vaciar-carrito"
                      onClick={() => setCart([])}
                    >
                      Vaciar
                    </button>
                    <button 
                      className="btn-comprar"
                      onClick={handleCheckout}
                    >
                      Pagar Ahora
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </main>

      <footer>
        <p>© 2025 - Level-Up Gamer</p>
      </footer>
    </>
  );
};

export default Products;