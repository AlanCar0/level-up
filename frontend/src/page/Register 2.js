import React, { useState } from 'react';
import { validarRut } from '../utils/validarRut.js';
import { useNavigate } from 'react-router-dom';
import API_URL from '../utils/apiconfig'; // Importamos la config
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
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!formData.rut.trim()) newErrors.rut = 'El RUT es obligatorio';
    else if (!validarRut(formData.rut)) newErrors.rut = 'El RUT no es válido';
    if (!formData.email.trim()) newErrors.email = 'El email es obligatorio';
    if (!formData.password) newErrors.password = 'La contraseña es obligatoria';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // ENVIAR A AWS
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.nombre,
          rut: formData.rut,
          email: formData.email,
          numero: formData.numero,
          password: formData.password
        })
      });

      if (response.ok) {
        alert("✅ Usuario registrado con éxito en Oracle");
        navigate('/login');
      } else {
        const msg = await response.text();
        alert("❌ Error: " + msg);
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión con el servidor");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h2>📝 Crear Cuenta</h2>
          <p>Únete a la comunidad Level-Up</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          {/* Nombre */}
          <div className="form-group">
            <label>Nombre Completo</label>
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Ej: Alan Caro" />
            {errors.nombre && <span className="error-message">{errors.nombre}</span>}
          </div>

          {/* RUT */}
          <div className="form-group">
            <label>RUT</label>
            <input type="text" name="rut" value={formData.rut} onChange={handleChange} placeholder="12.345.678-9" />
            {errors.rut && <span className="error-message">{errors.rut}</span>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="correo@ejemplo.com" />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          {/* Numero */}
          <div className="form-group">
            <label>Número (Opcional)</label>
            <input type="text" name="numero" value={formData.numero} onChange={handleChange} placeholder="+569..." />
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Contraseña</label>
            <div className="password-input-wrapper">
                <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="******" />
                <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "👁️" : "👁️‍🗨️"}</button>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label>Confirmar Contraseña</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="******" />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>

          <div className="form-actions">
            <button type="button" className="secondary-btn" onClick={() => navigate('/')}>🏠 Volver</button>
            <button type="submit" className={`submit-btn ${isSubmitting ? 'loading' : ''}`} disabled={isSubmitting}>
              {isSubmitting ? 'Registrando...' : '🎯 Crear Cuenta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;