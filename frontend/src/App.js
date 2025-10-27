import React from "react";
import "../src/css/style.css"; // Asegúrate de que el CSS esté en esta ruta

function App() {
  return (
    <>
      {/* Botón y formulario emergente */}
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
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Productos</a></li>
            <li><a href="#">Contacto</a></li>
          </ul>
        </nav>
      </header>

      {/* Main content */}
      <main>
        <section className="carrusel-css">
          <div className="slides">
            <img src="../src/img/inicio1.png" alt="Producto 1" />
            <img src="../src/img/inicio2.png" alt="Producto 2" />
            <img src="../src/img/inicio3.png" alt="Producto 3" />
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
}

export default App;