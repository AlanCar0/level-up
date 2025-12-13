import React, { useEffect } from "react";
import "../css/style.css";
import inicio1 from "../img/inicio1.png";
import inicio2 from "../img/inicio2.png";
import inicio3 from "../img/inicio3.png";

const Home = () => {

  useEffect(() => {
    initializePopups();
  }, []);

  const initializePopups = () => {
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

      <header>

      </header>

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