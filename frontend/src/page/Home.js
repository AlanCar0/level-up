import React, { useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import "../css/style.css";
import inicio1 from "../img/inicio1.png";
import inicio2 from "../img/inicio2.png";
import inicio3 from "../img/inicio3.png";

const Home = () => {
  const location = useLocation();
  const slidesRef = useRef(null);

  useEffect(() => {
    const interval = initializeCarousel();
    return () => clearInterval(interval);
  }, []);

  const initializeCarousel = () => {
    let currentSlide = 0;
    const slides = slidesRef.current;

    if (slides) {
      return setInterval(() => {
        currentSlide = (currentSlide + 1) % 3;
        slides.style.transform = `translateX(-${currentSlide * 100}%)`;
      }, 4000);
    }
  };

  return (
      <>
        <main className="home-container">
          {/* 🔔 Alertas (Login, errores, etc) */}
          {location.state?.error && (
              <div className="alert error">
                {location.state.error}
              </div>
          )}

          {/* 🎞️ Carrusel Hero con Overlay */}
          <section className="hero-section">
            <div className="carrusel-css">
              <div className="slides" ref={slidesRef}>
                <img src={inicio1} alt="Setup Gamer" />
                <img src={inicio2} alt="Periféricos RGB" />
                <img src={inicio3} alt="Consolas Next-Gen" />
              </div>
              {/* Overlay: Texto encima de la imagen */}
              <div className="hero-overlay">
                <h1 className="neon-text">LEVEL-UP GAMER</h1>
                <p>Eleva tu experiencia de juego al siguiente nivel.</p>

                {/* Botón que lleva a Productos */}
                <Link to="/productos" className="cta-btn">
                  🔥 Ver Catálogo
                </Link>
              </div>
            </div>
          </section>

          {/* 🎯 Sección Misión y Visión (Tarjetas) */}
          <section className="about-section">
            <div className="section-title">
              <h2>🚀 Sobre Nosotros</h2>
              <p className="subtitle">Pasión por el Gaming en cada detalle</p>
            </div>

            <div className="cards-grid">
              <div className="info-card gamer-card">
                <div className="card-icon">🎯</div>
                <h3>Nuestra Misión</h3>
                <p>
                  Brindamos a los gamers de todo Chile productos de primera calidad,
                  seleccionados para elevar su experiencia de juego. Fomentamos una
                  comunidad activa y conectada.
                </p>
              </div>

              <div className="info-card gamer-card">
                <div className="card-icon">👁️</div>
                <h3>Nuestra Visión</h3>
                <p>
                  Ser la tienda online líder en Chile, reconocida por su innovación,
                  servicio personalizado y fidelización de la comunidad gamer.
                </p>
              </div>

              <div className="info-card gamer-card">
                <div className="card-icon">💎</div>
                <h3>Calidad Premium</h3>
                <p>
                  Cada compra entrega no solo rendimiento, sino una experiencia única
                  que celebra el espíritu gamer y la innovación en cada detalle.
                </p>
              </div>
            </div>
          </section>

          {/* 🎮 Marcas Aliadas (Estética) */}
          <section className="brands-section">
            <h2>🤝 Marcas Oficiales</h2>
            <div className="brands-grid">
              <div className="brand-item">RAZER</div>
              <div className="brand-item">LOGITECH</div>
              <div className="brand-item">MSI</div>
              <div className="brand-item">HYPERX</div>
              <div className="brand-item">NVIDIA</div>
            </div>
          </section>

          {/* 🏆 Testimonios */}
          <section className="testimonials-section">
            <h2>🏆 Lo que dicen nuestros Gamers</h2>
            <div className="testimonials-container">
              <div className="testimonial-card">
                <p>"El envío fue rapidísimo. Mi setup quedó brutal con el teclado que compré."</p>
                <span>- Felipe G., Santiago</span>
                <div className="stars">⭐⭐⭐⭐⭐</div>
              </div>
              <div className="testimonial-card">
                <p>"Excelente atención, me ayudaron a elegir la gráfica perfecta para mi PC."</p>
                <span>- Andrea M., Viña del Mar</span>
                <div className="stars">⭐⭐⭐⭐⭐</div>
              </div>
            </div>
          </section>

          <footer>
            <p>© 2025 - Level-Up Gamer | Equipo FullStack 2 | Alan - Kareem</p>
          </footer>
        </main>
      </>
  );
};

export default Home;