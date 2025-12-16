import React, { useState } from "react";
import "../css/style.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
    boletin: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (!formData.nombre || !formData.email || !formData.asunto || !formData.mensaje) {
        throw new Error('Por favor completa todos los campos requeridos.');
      }
      if (!formData.email.includes('@')) {
        throw new Error('Por favor ingresa un email válido.');
      }
      setSubmitStatus('success');
      setFormData({
        nombre: '',
        email: '',
        asunto: '',
        mensaje: '',
        boletin: false
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <>
        <main className="contact-page">

          {/* HERO BANNER */}
          <section className="contact-hero">
            <div className="hero-content">
              <h1 className="neon-text">✉️ CENTRO DE MANDO ✉️</h1>
              <p className="hero-subtitle">
                Contacta con la base de <strong className="neon-text">Level-Up</strong>.
                Estamos listos para tu próxima misión. 🔥🕹️
              </p>
            </div>
          </section>

          {/* CONTENEDOR CENTRAL: FORMULARIO + INFO CONTACTO */}
          <div className="contact-content">

            {/* COLUMNA IZQUIERDA: Formulario */}
            <section className="form-section">
              <div className="form-card gamer-card-style">
                <div className="form-header">
                  <h2>📬 Formulario de Contacto</h2>
                  <p>Completa los datos y te responderemos en menos de 24 horas.</p>
                </div>

                {submitStatus === 'success' && (
                    <div className="alert success">✅ ¡Mensaje transmitido! Cambio y fuera.</div>
                )}
                {submitStatus === 'error' && (
                    <div className="alert error">❌ Error en la transmisión. Verifica tus datos.</div>
                )}

                <form id="formContacto" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="nombre">Nombre Completo *</label>
                    <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} required placeholder="Gamertag o Nombre" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Correo Electrónico *</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="ejemplo@email.com" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="asunto">Asunto *</label>
                    <input type="text" id="asunto" name="asunto" value={formData.asunto} onChange={handleInputChange} required placeholder="Asunto de la misión" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="mensaje">Mensaje *</label>
                    <textarea name="mensaje" id="mensaje" value={formData.mensaje} onChange={handleInputChange} required placeholder="Describe tu consulta..." rows="5"></textarea>
                  </div>
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input type="checkbox" name="boletin" id="boletin" checked={formData.boletin} onChange={handleInputChange} />
                      <span className="checkmark"></span>
                      ¿Recibir ofertas exclusivas?
                    </label>
                  </div>
                  <button type="submit" className={`submit-btn ${isSubmitting ? 'loading' : ''}`} disabled={isSubmitting}>
                    {isSubmitting ? '🔄 Transmitiendo...' : '🚀 Enviar Mensaje'}
                  </button>
                </form>
              </div>
            </section>

            {/* COLUMNA DERECHA: Información de Contacto (SIN MAPA) */}
            <section className="info-section">
              <div className="info-card gamer-card-style">
                <h2>📞 Canales de Comunicación</h2>
                <div className="contact-methods">
                  <div className="contact-method">
                    <div className="method-icon">📧</div>
                    <div className="method-info">
                      <h3>Correo Electrónico</h3>
                      <p>Soporte@LevelUp.cl</p>
                      <span className="method-note">Respuesta en 24 horas</span>
                    </div>
                  </div>
                  <div className="contact-method">
                    <div className="method-icon">📱</div>
                    <div className="method-info">
                      <h3>WhatsApp</h3>
                      <p>+56 9 1234 5678</p>
                      <span className="method-note">Atención inmediata</span>
                    </div>
                  </div>
                  <div className="contact-method">
                    <div className="method-icon">📍</div>
                    <div className="method-info">
                      <h3>Base de Operaciones</h3>
                      <p>Antonio Varas 666</p>
                      <p>Providencia, RM</p>
                      <span className="method-note">10:00 - 20:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* --- NUEVA SECCIÓN: MAPA FULL WIDTH (RECTÁNGULO GIGANTE) --- */}
          <section className="full-width-map-container">
            <div className="map-overlay-title">
              <h2>📍 UBICACIÓN ESTRATÉGICA</h2>
            </div>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.508036456066!2d-70.6188529242696!3d-33.43336597333639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf7f5b04b7c5%3A0x694e0b2b1a93c4f1!2sAntonio%20Varas%20666%2C%20Providencia%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1700000000000!5m2!1ses!2scl"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Level-Up Gamer"
                className="google-map-full"
            ></iframe>
          </section>

          {/* FAQ SECTION */}
          <section className="faq-section">
            <h2>❓ Preguntas Frecuentes</h2>
            <div className="faq-grid">
              <div className="faq-item gamer-card-style">
                <h3>¿Tiempo de respuesta?</h3>
                <p>Normalmente respondemos en menos de 24 horas hábiles.</p>
              </div>
              <div className="faq-item gamer-card-style">
                <h3>¿Envíos a regiones?</h3>
                <p>Sí, desplegamos equipamiento a todo Chile.</p>
              </div>
              <div className="faq-item gamer-card-style">
                <h3>¿Garantía?</h3>
                <p>Todos nuestros productos tienen garantía de 3 meses.</p>
              </div>
              <div className="faq-item gamer-card-style">
                <h3>¿Devoluciones?</h3>
                <p>Sí, dentro de los primeros 15 días.</p>
              </div>
            </div>
          </section>
        </main>

        <footer>
          <p>© 2025 - Level-Up Gamer | Equipo FullStack 2 | Alan - Kareem</p>
        </footer>
      </>
  );
};

export default Contact;