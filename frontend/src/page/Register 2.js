import React, { useState } from 'react';
import { validarRut, validarCorreo } from '../utils/validarRut.js';
import { useNavigate } from 'react-router-dom';
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

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    } else if (formData.nombre.length < 2) {
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.rut.trim()) {
      newErrors.rut = 'El RUT es obligatorio';
    } else if (!validarRut(formData.rut)) {
      newErrors.rut = 'El RUT no es válido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo es obligatorio';
    } else if (!validarCorreo(formData.email)) {
      newErrors.email = 'El correo no es válido';
    }

    if (!formData.numero.trim()) {
      newErrors.numero = 'El número es obligatorio';
    } else if (!/^[0-9+-\s()]{8,}$/.test(formData.numero)) {
      newErrors.numero = 'El número no es válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
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
      // Simular proceso de registro
      await new Promise(resolve => setTimeout(resolve, 1500));

      const { nombre, rut, email, numero, password } = formData;
      const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
      
      // Verificar si el usuario ya existe
      const usuarioExistente = usuarios.find(user => user.email === email || user.rut === rut);
      if (usuarioExistente) {
        alert('❌ El usuario ya está registrado con ese email o RUT');
        setIsSubmitting(false);
        return;
      }

      const nuevoUsuario = { 
        nombre, 
        rut, 
        email, 
        numero, 
        password,
        fechaRegistro: new Date().toISOString(),
        id: Date.now()
      };

      usuarios.push(nuevoUsuario);
      localStorage.setItem('usuarios', JSON.stringify(usuarios));

      // Mostrar mensaje de éxito
      alert('🎉 ¡Usuario registrado correctamente!\n\nAhora puedes iniciar sesión con tu cuenta.');
      
      // Resetear formulario
      setFormData({ 
        nombre: '', 
        rut: '', 
        email: '', 
        numero: '', 
        password: '',
        confirmPassword: ''
      });
      setErrors({});
      
      // Redirigir al login
      navigate('/login');

    } catch (error) {
      alert('❌ Error al registrar usuario. Inténtalo nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatRut = (rut) => {
    // Limpiar RUT
    const cleanRut = rut.replace(/[^0-9kK]/g, '');
    
    if (cleanRut.length <= 1) return cleanRut;
    
    let formattedRut = cleanRut.slice(-1); // Dígito verificador
    formattedRut = '-' + formattedRut;
    
    if (cleanRut.length > 1) {
      formattedRut = cleanRut.slice(-7, -1) + formattedRut; // últimos 6 dígitos del cuerpo
    }
    
    if (cleanRut.length > 7) {
      formattedRut = cleanRut.slice(0, -7) + '.' + formattedRut; // millones
    }
    
    if (cleanRut.length > 10) {
      formattedRut = cleanRut.slice(0, -10) + '.' + formattedRut; // miles de millones
    }
    
    return formattedRut;
  };

  const handleRutChange = (e) => {
    const { value } = e.target;
    const formattedRut = formatRut(value);
    setFormData({
      ...formData,
      rut: formattedRut
    });
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
          <div className="register-icon">🎮</div>
          <h1>Crear Cuenta</h1>
          <p>Únete a la comunidad Level-Up Gamer</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="nombre" className="form-label">
              👤 Nombre Completo
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={`form-input ${errors.nombre ? 'error' : ''}`}
              placeholder="Ingresa tu nombre completo"
              required
            />
            {errors.nombre && <span className="error-message">{errors.nombre}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="rut" className="form-label">
              🆔 RUT
            </label>
            <input
              type="text"
              id="rut"
              name="rut"
              value={formData.rut}
              onChange={handleRutChange}
              className={`form-input ${errors.rut ? 'error' : ''}`}
              placeholder="12.345.678-9"
              required
            />
            {errors.rut && <span className="error-message">{errors.rut}</span>}
          </div>

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
            <label htmlFor="numero" className="form-label">
              📱 Número de Teléfono
            </label>
            <input
              type="tel"
              id="numero"
              name="numero"
              value={formData.numero}
              onChange={handleChange}
              className={`form-input ${errors.numero ? 'error' : ''}`}
              placeholder="+56 9 1234 5678"
              required
            />
            {errors.numero && <span className="error-message">{errors.numero}</span>}
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
                placeholder="Crea una contraseña segura"
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

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              🔒 Confirmar Contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
              placeholder="Repite tu contraseña"
              required
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>

          <div className="form-info">
            <p>💡 Usa una contraseña segura con al menos 6 caracteres.</p>
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
                  Registrando...
                </>
              ) : (
                '🎯 Crear Cuenta'
              )}
            </button>
          </div>
        </form>

        {/* Footer del formulario */}
        <div className="register-footer">
          <p>
            ¿Ya tienes una cuenta?{' '}
            <button 
              type="button" 
              className="link-btn"
              onClick={() => navigate('/login')}
            >
              Inicia sesión aquí
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;