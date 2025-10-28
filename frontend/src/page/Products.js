import React, { useState, useEffect } from "react";
import "../css/style.css";

const Products = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products] = useState([
    {
      id: 1,
      name: "Nintendo Switch OLED",
      price: 350000,
      image: "https://media.solotodo.com/media/products/1473681_picture_1634002127.jpg", 
      category: "Consolas",
      stock: 5
    },
    {
      id: 2,
      name: "PlayStation 5",
      price: 550000,
      image: "https://clsonyb2c.vtexassets.com/arquivos/ids/465172-800-800?v=638658958190900000&width=800&height=800&aspect=true", 
      category: "consolas",
      stock: 3
    },
    {
      id: 3,
      name: "Xbox Series X",
      price: 520000,
      image: "https://media.solotodo.com/media/products/1263783_picture_1604617331.png", 
      category: "consolas",
      stock: 4
    },
    {
      id: 4,
      name: "Headset Gamer RGB Rosado",
      price: 85000,
      image: "https://i5.walmartimages.cl/asr/0c4d76f3-0c20-4470-a76e-929552419382.c59c3679af4915b1e18c9b44861729a3.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
      category: "Accesorios",
      stock: 10
    },
    {
      id: 5,
      name: "Teclado mecánico redragon kumara k552",
      price: 120000,
      image: "https://media.solotodo.com/media/products/1508732_picture_1639576617.jpg", 
      category: "Accesorios",
      stock: 8
    },
    {
      id: 6,
      name: "Mouse Razer Deathadder",
      price: 45000,
      image: "https://static.myshop.cl/32570/5_1733243352000.png", 
      category: "Accesorios",
      stock: 12
    },
    {
      id: 7,
      name: "Set de Cartas Pokemon 151",
      price: 49990,
      image: "https://www.huntercardtcg.com/wp-content/uploads/2023/09/uoc.webp", 
      category: "Cartas",
      stock: 15
    },
    {
      id: 8,
      name: "Ea Sports FC 26 - PS5",
      price: 69990,
      image: "https://www.bingo.eg/wp-content/uploads/2025/09/FC26PS5-1.jpg", 
      category: "Juegos",
      stock: 2
    }

  ]);

  

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('levelUpCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
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

  // Función para comprar (simulación)
  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    // Verificar stock antes de comprar
    const stockErrors = [];
    cart.forEach(item => {
      const product = products.find(p => p.id === item.id);
      if (item.quantity > product.stock) {
        stockErrors.push(`${item.name} - Stock disponible: ${product.stock}`);
      }
    });

    if (stockErrors.length > 0) {
      alert('❌ Error de stock:\n' + stockErrors.join('\n'));
      return;
    }

    alert(`✅ Compra realizada por ${formatPrice(getTotalPrice())}\n¡Gracias por tu compra!`);
    

    setCart([]);
  };

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
        
        {/* Botón del Carrito */}
        <button 
          className="btn-carrito"
          onClick={() => setIsCartOpen(true)}
        >
          🛒 Carrito ({getTotalItems()})
        </button>
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