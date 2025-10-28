import React, { useEffect } from "react";
import "../css/style.css";

const Products = () => {
  
  useEffect(() => {
    // Inicializar funcionalidades del carrito
    initializeCart();
  }, []);

  const initializeCart = () => {
    // Aquí va tu lógica existente del carrito
    console.log("Carrito inicializado");
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
      </header>

      <main>
        <section>
          <h2>Nuestros Productos</h2>
          <div className="productos-container">
            {/* Aquí irán tus productos dinámicos */}
            <div className="producto">
              <img src="/img/producto1.jpg" alt="Producto 1" />
              <h3>Producto Ejemplo</h3>
              <p>$50.000</p>
              <button className="btn-agregar-carrito">Agregar al Carrito</button>
            </div>
          </div>
        </section>

        {/* Popup del Carrito */}
        <div id="cartPopup" className="popup-cart">
          <div className="cart-content">
            <button id="closeCartBtn" className="close-cart">&times;</button>
            <h2>Tu Carrito</h2>
            <div className="cart-items">
              {/* Items del carrito */}
            </div>
          </div>
        </div>
      </main>

      <footer>
        <p>© 2025 - Level-Up Gamer | Equipo FullStack 2 | Alan - Kareem</p>
      </footer>
    </>
  );
};

export default Products;