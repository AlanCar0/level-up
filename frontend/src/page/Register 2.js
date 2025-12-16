import React, { useState } from 'react';
import { validarRut, validarCorreo } from '../utils/validarRut.js';
import { useNavigate } from 'react-router-dom';
// IMPORTAMOS SERVICIO
import { register } from '../service/auth';
import '../css/style.css';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    rut: '',
    email: '',
    numero: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  /* =====================
     UTILIDADES FORMATO (INTACTAS)
  ====================== */

  const formatRutVisual = (value) => {
    const clean = value.replace(/[^0-9kK]/g, '').toUpperCase();
    if (clean.length <= 1) return clean;
    let body = clean.slice(0, -1);
    const dv = clean.slice(-1);
    body = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${body}-${dv}`;
  };

  const cleanRutBackend = (rut) =>
      rut.replace(/\./g, '').toUpperCase();

  const formatPhoneVisual = (value) => {
    let clean = value.replace(/\D/g, '');
    if (clean.startsWith('56')) clean = clean.slice(2);
    let formatted = '+56 ';
    if (clean.length > 0) formatted += clean.slice(0, 1);
    if (clean.length > 1) formatted += ' ' + clean.slice(1, 5);
    if (clean.length > 5) formatted += ' ' + clean.slice(5, 9);
    return formatted.trim();
  };

  const cleanPhoneBackend = (phone) =>
      phone.replace(/\D/g, '');

  const getPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  /* =====================
     HANDLERS (INTACTOS)
  ====================== */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleRutChange = (e) => {
    const formatted = formatRutVisual(e.target.value);
    if (formatted.length <= 12) {
      setFormData({ ...formData, rut: formatted });
    }
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneVisual(e.target.value);
    if (formatted.length <= 17) {
      setFormData({ ...formData, numero: formatted });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!formData.rut || !validarRut(cleanRutBackend(formData.rut)))
      newErrors.rut = 'RUT inválido';
    if (!formData.email || !validarCorreo(formData.email))
      newErrors.email = 'Correo inválido';
    if (!formData.numero || cleanPhoneBackend(formData.numero).length < 11)
      newErrors.numero = 'Número inválido';
    if (!formData.password || formData.password.length < 6)
      newErrors.password = 'Contraseña muy corta';
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* =====================
     SUBMIT (LÓGICA ACTUALIZADA)
  ====================== */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // --- CAMBIO: USAR SERVICIO ---
      await register({
          nombre: formData.nombre,
          rut: cleanRutBackend(formData.rut),
          email: formData.email,
          phone: cleanPhoneBackend(formData.numero),
          password: formData.password
      });

      setStatusMessage({
        type: 'success',
        text: '🎉 Registro exitoso. Redirigiendo al login...'
      });

      setTimeout(() => navigate('/login'), 1500);

    } catch (error) {
      const message = error.response?.data?.message || 'Error de conexión con el servidor';
      setStatusMessage({
        type: 'error',
        text: `❌ ${message}`
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <div className="register-container">
        <div className="register-card">

          {statusMessage && (
              <div className={`alert ${statusMessage.type}`}>
                {statusMessage.text}
              </div>
          )}

          <div className="register-header">
            <h1>🎮 Crear Cuenta</h1>
            <p>Únete a Level-Up Gamer</p>
          </div>

          <form onSubmit={handleSubmit} className="register-form">

            <div className="form-group">
              <label>👤 Nombre Completo</label>
              <input
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className={errors.nombre ? 'error' : ''}
              />
              {errors.nombre && <span className="error-message">{errors.nombre}</span>}
            </div>

            <div className="form-group">
              <label>🆔 RUT</label>
              <input
                  name="rut"
                  value={formData.rut}
                  onChange={handleRutChange}
                  placeholder="12.345.678-9"
                  className={errors.rut ? 'error' : ''}
              />
              {errors.rut && <span className="error-message">{errors.rut}</span>}
            </div>

            <div className="form-group">
              <label>📧 Correo</label>
              <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label>📱 Teléfono</label>
              <input
                  name="numero"
                  value={formData.numero}
                  onChange={handlePhoneChange}
                  placeholder="+56 9 1234 5678"
                  className={errors.numero ? 'error' : ''}
              />
              {errors.numero && <span className="error-message">{errors.numero}</span>}
            </div>

            <div className="form-group">
              <label>🔑 Contraseña</label>
              <div className="password-input-container">
                <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? 'error' : ''}
                />
                <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>

              <div className="password-strength">
                <div className={`strength-bar level-${getPasswordStrength(formData.password)}`} />
              </div>

              <small className="strength-text">
                {['Muy débil', 'Débil', 'Media', 'Fuerte', 'Épica'][getPasswordStrength(formData.password)]}
              </small>

              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label>🔒 Confirmar Contraseña</label>
              <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>

            <div className="form-actions">
              <button type="button" className="secondary-btn" onClick={() => navigate('/')}>
                🏠 Volver
              </button>
              <button
                  type="submit"
                  className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
                  disabled={isSubmitting}
              >
                {isSubmitting ? 'Registrando...' : '🎯 Crear Cuenta'}
              </button>
            </div>

          </form>

          <div className="register-footer">
            <p>
              ¿Ya tienes cuenta?{' '}
              <button className="link-btn" onClick={() => navigate('/login')}>
                Inicia sesión
              </button>
            </p>
          </div>

        </div>
      </div>
  );
};

export default Register;