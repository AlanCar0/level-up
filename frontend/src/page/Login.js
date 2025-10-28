import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../css/style.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'El correo es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El correo no es válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      // Simular proceso de login
      await new Promise(resolve => setTimeout(resolve, 1000));

      const { email, password } = formData;
      const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
      
      // Buscar usuario
      const usuarioEncontrado = usuarios.find(
        (u) => u.email === email && (u.password === password || (u.password === undefined && u.rut === password))
      );

      if (usuarioEncontrado) {
        // Guardar usuario en sesión
        localStorage.setItem('usuarioActual', JSON.stringify(usuarioEncontrado));
        
        // Mostrar mensaje de éxito
        alert(`🎮 ¡Bienvenido de vuelta, ${usuarioEncontrado.nombre}!`);
        
        // Redirigir al inicio
        navigate('/');
      } else {
        setErrors({ 
          general: 'Correo o contraseña incorrectos. Verifica tus credenciales.' 
        });
      }

    } catch (error) {
      setErrors({ 
        general: '❌ Error al iniciar sesión. Inténtalo nuevamente.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <div className="register-container">
      <div className="register-card">
        {/* Botón Volver al Inicio */}
        <button 
          className="back-button"
          onClick={() => navigate('/')}
          title="Volver al Inicio"
        >
          ← Volver al Inicio
        </button>

        {/* Header del formulario */}
        <div className="register-header">
          <div className="register-icon">🔐</div>
          <h1>Iniciar Sesión</h1>
          <p>Accede a tu cuenta Level-Up Gamer</p>
        </div>

        {/* Mensaje de error general */}
        {errors.general && (
          <div className="alert error">
            {errors.general}
          </div>
        )}

        {/* Botón de demo */}
  

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              📧 Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder="tu@email.com"
              required
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              🔑 Contraseña
            </label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="Ingresa tu contraseña"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-info">
            <p>💡 ¿Problemas para acceder? Verifica tu correo y contraseña.</p>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="secondary-btn"
              onClick={() => navigate('/')}
            >
              🏠 Volver al Inicio
            </button>
            <button 
              type="submit" 
              className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Iniciando Sesión...
                </>
              ) : (
                '🎯 Ingresar'
              )}
            </button>
          </div>
        </form>

        {/* Enlaces adicionales */}
        <div style={{ 
          textAlign: 'center', 
          margin: '1.5rem 0',
          padding: '1rem',
          background: 'rgba(57, 255, 20, 0.05)',
          borderRadius: '8px',
          border: '1px solid rgba(57, 255, 20, 0.2)'
        }}>
          <p style={{ 
            color: '#D3D3D3', 
            margin: '0.5rem 0',
            fontSize: '0.9rem'
          }}>
            🔧 <strong>Soporte Técnico:</strong> contacto@levelup.com
          </p>
        </div>

        {/* Footer del formulario */}
        <div className="register-footer">
          <p>
            ¿No tienes una cuenta?{' '}
            <button 
              type="button" 
              className="link-btn"
              onClick={() => navigate('/register')}
            >
              Regístrate aquí
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;