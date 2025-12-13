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
      <header>

      </header>

      <main>
        <section className="contact-hero">
          <div className="hero-content">
            <h1>✉️ Contáctanos ✉️</h1>
            <p className="hero-subtitle">
              En <strong className="neon-text">Tienda Level-Up</strong> nos especializamos en brindar 
              la mejor experiencia gamer. Nuestro equipo de especialistas está listo para ayudarte para que encuentres tu producto deseado. 🔥🕹️
            </p>
          </div>
        </section>

        <div className="contact-content">
          {/* Formulario */}
          <section className="form-section">
            <div className="form-card">
              <div className="form-header">
                <h2>📬 Formulario de Contacto</h2>
                <p>Completa el formulario y te responderemos en menos de 24 horas</p>
              </div>

              {submitStatus === 'success' && (
                <div className="alert success">
                  ✅ ¡Mensaje enviado correctamente! Nos pondremos en contacto pronto.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="alert error">
                  ❌ Por favor completa todos los campos requeridos correctamente.
                </div>
              )}

              <form id="formContacto" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="nombre">Nombre Completo *</label>
                  <input 
                    type="text" 
                    id="nombre" 
                    name="nombre" 
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required 
                    placeholder="Ingresa tu nombre completo"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Correo Electrónico *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                    placeholder="ejemplo@email.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="asunto">Asunto *</label>
                  <input 
                    type="text" 
                    id="asunto" 
                    name="asunto" 
                    value={formData.asunto}
                    onChange={handleInputChange}
                    required 
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="mensaje">Mensaje *</label>
                  <textarea 
                    name="mensaje" 
                    id="mensaje" 
                    value={formData.mensaje}
                    onChange={handleInputChange}
                    required 
                    placeholder="Describe detalladamente tu consulta..."
                    rows="5"
                  ></textarea>
                </div>

                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      name="boletin" 
                      id="boletin" 
                      checked={formData.boletin}
                      onChange={handleInputChange}
                    />
                    <span className="checkmark"></span>
                    ¿Deseas suscribirte a nuestras novedades y ofertas exclusivas?
                  </label>
                </div>

                <button 
                  type="submit" 
                  className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '🔄 Enviando...' : '🚀 Enviar Mensaje'}
                </button>
              </form>
            </div>
          </section>

          {/* Informacion*/}
          <section className="info-section">
            <div className="info-card">
              <h2>📞 Otros Medios de Contacto</h2>
              
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
                    <h3>Dirección</h3>
                    <p>Antonio Varas 666</p>
                    <p>Providencia, Región Metropolitana</p>
                    <span className="method-note">Horario: 10:00 - 20:00</span>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">🕒</div>
                  <div className="method-info">
                    <h3>Horarios de Atención</h3>
                    <p>Lunes a Viernes: 10:00 - 20:00</p>
                    <p>Sábados: 11:00 - 18:00</p>
                    <span className="method-note">Cerrado domingos</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Apartado de Google Maps */}
        <section className="maps-section">
          <div className="maps-container">
            <h2>📍 Ubicación de Nuestra Tienda</h2>
            <p className="maps-description">
              Visítanos en nuestro local físico en Providencia. ¡Te esperamos!
            </p>
            
            <div className="map-wrapper">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.508036456066!2d-70.6188529242696!3d-33.43336597333639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf7f5b04b7c5%3A0x694e0b2b1a93c4f1!2sAntonio%20Varas%20666%2C%20Providencia%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1700000000000!5m2!1ses!2scl"
                width="100%" 
                height="450" 
                style={{ border: 0, borderRadius: '15px' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Level-Up Gamer"
                className="google-map"
              ></iframe>
            </div>

            <div className="location-details">
              <div className="location-info">
                <h3>🏪 Información del Local</h3>
                <div className="location-features">
                  <div className="feature">
                    <span className="feature-icon">🚗</span>
                    <span>Estacionamiento gratuito para clientes</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">♿</span>
                    <span>Acceso para personas con movilidad reducida</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">💳</span>
                    <span>Aceptamos todas tipos de tarjetas</span>
                  </div>
                </div>
              </div>

              <div className="transport-info">
                <h3>🚍 Cómo Llegar</h3>
                <div className="transport-options">
                  <div className="transport-option">
                    <strong>Metro:</strong> Línea 1 - Estación Manuel Montt (5 min caminando)
                  </div>
                  <div className="transport-option">
                    <strong>Micros:</strong> 106, 508
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="faq-section">
          <h2>❓ Preguntas Frecuentes</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>¿Cuánto tardan en responder?</h3>
              <p>Normalmente respondemos en menos de 24 horas hábiles.</p>
            </div>
            <div className="faq-item">
              <h3>¿Hacen envíos a regiones?</h3>
              <p>Sí, realizamos envíos a todo Chile con costos variables.</p>
            </div>
            <div className="faq-item">
              <h3>¿Tienen garantía?</h3>
              <p>Todos nuestros productos tienen garantía de 3 meses.</p>
            </div>
            <div className="faq-item">
              <h3>¿Aceptan devoluciones?</h3>
              <p>Sí, solo dentro de los primeros 15 días.</p>
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