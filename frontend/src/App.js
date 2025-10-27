import React, { useState } from "react";
import "./css/style.css";

import inicio1 from "./img/inicio1.png";
import inicio2 from "./img/inicio2.png";
import inicio3 from "./img/inicio3.png";
import { validarCorreo, validarRut } from "./utils/validarRut.js";

function App() {
  const [popupVisible, setPopupVisible] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    rut: "",
    email: "",
    numero: "",
  });

  const openPopup = () => setPopupVisible(true);
  const closePopup = () => setPopupVisible(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nombre, rut, email, numero } = formData;

    if (!nombre.trim()) {
      alert("Por favor, ingrese su nombre.");
      return;
    }

    if (!validarRut(rut)) {
      alert("Por favor, ingrese un RUT válido.");
      return;
    }

    if (!validarCorreo(email)) {
      alert("Por favor, ingrese un correo electrónico válido.");
      return;
    }

    if (!numero.trim()) {
      alert("Por favor, ingrese su número.");
      return;
    }

    alert("Formulario enviado con éxito.");
    setFormData({
      nombre: "",
      rut: "",
      email: "",
      numero: "",
    });
    closePopup();
  };

  return (
    <>
      {/* Botón para abrir popup */}
      <button onClick={openPopup} className="btn-open-popup">
        Registrarse
      </button>

      {/* Popup */}
      <div
        id="popupOverlay"
        className={`overlay ${popupVisible ? "active" : ""}`}
        onClick={(e) => e.currentTarget === e.target && closePopup()}
      >
        <div className="rgform">
          <button
            onClick={closePopup}
            className="btn-close-popup"
            aria-label="Cerrar popup"
          >
            &times;
          </button>
          <h2>Formulario de Registro</h2>
          <form id="registroForm" noValidate onSubmit={handleSubmit}>
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              required
              value={formData.nombre}
              onChange={handleChange}
            />

            <label htmlFor="rut">RUT:</label>
            <input
              type="text"
              id="rut"
              name="rut"
              placeholder="12345678-9"
              required
              value={formData.rut}
              onChange={handleChange}
            />

            <label htmlFor="email">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="ejemplo@correo.com"
              required
              value={formData.email}
              onChange={handleChange}
            />

            <label htmlFor="numero">Número:</label>
            <input
              type="tel"
              id="numero"
              name="numero"
              placeholder="+56 9 1234 5678"
              required
              value={formData.numero}
              onChange={handleChange}
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
}

export default App;