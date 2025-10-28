import React, { useEffect } from "react";
import "../css/style.css";
import inicio1 from "../img/inicio1.png";
import inicio2 from "../img/inicio2.png";
import inicio3 from "../img/inicio3.png";

const Home = () => {
  
  useEffect(() => {
    // Inicializar todos los popups y funcionalidades después de que el componente se monte
    initializePopups();
  }, []);

  const initializePopups = () => {
    // Popup de Registro
    const openPopupBtn = document.getElementById('openPopupBtn');
    const closePopupBtn = document.getElementById('closePopupBtn');
    const popupOverlay = document.getElementById('popupOverlay');
    const registroForm = document.getElementById('registroForm');

    if (openPopupBtn && popupOverlay) {
      openPopupBtn.onclick = function() {
        popupOverlay.style.display = 'flex';
      };

      closePopupBtn.onclick = function() {
        popupOverlay.style.display = 'none';
      };

      popupOverlay.onclick = function(e) {
        if (e.target === popupOverlay) {
          popupOverlay.style.display = 'none';
        }
      };
    }

    if (registroForm) {
      registroForm.onsubmit = function(e) {
        e.preventDefault();
        alert('Formulario enviado correctamente!');
        popupOverlay.style.display = 'none';
        registroForm.reset();
      };
    }

    // Popup del Carrito (si existe)
    const cartPopup = document.getElementById('cartPopup');
    const closeCartBtn = document.getElementById('closeCartBtn');
    
    if (closeCartBtn && cartPopup) {
      closeCartBtn.onclick = function() {
        cartPopup.style.display = 'none';
      };
    }

    // Carrusel automático
    initializeCarousel();
  };

  const initializeCarousel = () => {
    let currentSlide = 0;
    const slides = document.querySelector('.slides');
    
    if (slides) {
      setInterval(() => {
        currentSlide = (currentSlide + 1) % 3; // Asumiendo 3 slides
        slides.style.transform = `translateX(-${currentSlide * 100}%)`;
      }, 4000);
    }
  };

  return (
    <>
      {/* Botón y formulario emergente de Registro */}
      <button id="openPopupBtn" className="btn-open-popup">
        Registrarse
      </button>

      <div id="popupOverlay" className="overlay">
        <div className="rgform">
          <button
            id="closePopupBtn"
            className="btn-close-popup"
            aria-label="Cerrar popup"
          >
            &times;
          </button>
          <h2>Formulario de Registro</h2>
          <form id="registroForm" noValidate>
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required />

            <label htmlFor="rut">RUT:</label>
            <input
              type="text"
              id="rut"
              name="rut"
              placeholder="12345678-9"
              required
            />

            <label htmlFor="email">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="ejemplo@correo.com"
              required
            />

            <label htmlFor="numero">Número:</label>
            <input
              type="tel"
              id="numero"
              name="numero"
              placeholder="+56 9 1234 5678"
              required
            />

            <button type="submit" className="btn-submit">
              Enviar
            </button>
          </form>
        </div>
      </div>

      {/* Header */}
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

      {/* Main content */}
      <main>
        <section className="carrusel-css">
          <div className="slides">
            <img src={inicio1} alt="Producto 1" />
            <img src={inicio2} alt="Producto 2" />
            <img src={inicio3} alt="Producto 3" />
          </div>
        </section>

        <section>
          <h2>Misión</h2>
          <p>
            Brindamos a los gamers de todo Chile productos de primera calidad,
            seleccionados cuidadosamente para satisfacer sus necesidades y
            elevar su experiencia de juego. Nuestra tienda ofrece un servicio
            personalizado, pensado para acompañar a cada jugador en su pasión
            por los videojuegos, fomentando una comunidad activa, conectada y
            comprometida. Cada compra no solo entrega productos de alto
            rendimiento, sino también una experiencia única que celebra el
            espíritu gamer y la innovación en cada detalle.
          </p>
        </section>

        <section>
          <h2>Visión</h2>
          <p>
            Ser la tienda online líder en Chile, reconocida por su innovación,
            servicio y fidelización gamer.
          </p>
        </section>

        <footer>
          <p>© 2025 - Level-Up Gamer | Equipo FullStack 2 | Alan - Kareem</p>
        </footer>
      </main>
    </>
  );
};

export default Home;