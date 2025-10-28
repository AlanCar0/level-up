import React, { useEffect } from "react";
import "../css/style.css";

const Contact = () => {
  
  useEffect(() => {
    // Inicializar validación del formulario de contacto
    initializeContactForm();
  }, []);

  const initializeContactForm = () => {
    const contactForm = document.getElementById('formContacto');
    
    if (contactForm) {
      contactForm.onsubmit = function(e) {
        e.preventDefault();
        
        // Validaciones básicas
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const mensaje = document.getElementById('mensaje').value;
        
        if (nombre && email && mensaje) {
          alert('¡Mensaje enviado correctamente! Nos pondremos en contacto pronto.');
          contactForm.reset();
        } else {
          alert('Por favor completa todos los campos requeridos.');
        }
      };
    }
  };

  return (
    <>
      <header>
        <h1 className="titulo">✉️ Contacto ✉️</h1>
        <nav>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/productos">Productos</a></li>
            <li><a href="/contacto" className="activo">Contacto</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section>
          <h2>¿Necesitas ayuda? Contactanos</h2>
          <p>
            En <strong>Level-Up</strong> nos encargamos de darle a nuestros jugadores un buen servicio.
            Rellena el formulario de contacto para ayudarte de una manera mas personalizada
            con nosotros un grupo de especialistas 🔥🕹️.
          </p>
        </section>

        <form id="formContacto">
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" required placeholder="Ingresa tu nombre" />

          <label htmlFor="email">Correo:</label>
          <input type="email" id="email" name="email" required placeholder="ejemplocorrecto@email.com" />

          <label htmlFor="asunto">Asunto:</label>
          <input type="text" id="asunto" name="asunto" required placeholder="Escribe el tema a preguntar" />

          <label htmlFor="mensaje">Mensaje:</label>
          <textarea name="mensaje" id="mensaje" cols="20" rows="2" required placeholder="Ingresa aqui tu mensaje"></textarea>

          <label>
            <input type="checkbox" name="boletin" id="boletin" value="boletin" />
            ¿Deseas Suscribirte a Novedades Periódicas?
          </label>

          <button type="submit">Enviar</button>
        </form>

        <section className="info-contacto">
          <h2>También puedes contactarnos por:</h2>
          <ul>
            <li>📧 <u>Correo</u>: Soporte@LevelUp.cl</li>
            <li>📱<u>WhatsApp</u>: +569 12345678</li>
            <li>📍<u>Dirección</u>: Antonio Varas 666, 7500961 Providencia, Región Metropolitana</li>
          </ul>
        </section>
      </main>

      <footer>
        <p>© 2025 - Level-Up Gamer | Equipo FullStack 2 | Alan - Kareem</p>
      </footer>
    </>
  );
};

export default Contact;