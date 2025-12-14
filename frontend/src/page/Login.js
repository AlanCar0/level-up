import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URL from '../utils/apiconfig';
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
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      if (response.ok) {
        const data = await response.json();

        // ✅ Guardar token y usuario (CLAVE PARA ProtectedRoute)
        localStorage.setItem('token', data.token);
        localStorage.setItem('usuario', JSON.stringify({
          id: data.id,
          nombre: data.nombre,
          rol: data.rol
        }));

        // ✅ Redirección SEGÚN ROL
        if (data.rol === "ADMIN") {
          navigate("/admin/productos");
        } else {
          navigate("/productos");
        }

      } else {
        let errorMessage = "Credenciales incorrectas";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData;
        } catch {
          const errorText = await response.text();
          if (errorText) errorMessage = errorText;
        }
        alert(`❌ ${errorMessage}`);
      }
    } catch (error) {
      alert(
          `Error al conectar con el servidor.\n\n` +
          `Verifica:\n` +
          `1. Backend activo\n` +
          `2. API_URL correcta\n` +
          `3. CORS`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <h2>👾 Iniciar Sesión</h2>
            <p>¡Bienvenido de nuevo, jugador!</p>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label>Correo Electrónico</label>
              <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="ejemplo@correo.com"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label>Contraseña</label>
              <div className="password-input-wrapper">
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? 'error' : ''}
                    placeholder="Ingresa tu contraseña"
                />
                <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-actions">
              <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => navigate('/')}
              >
                🏠 Volver
              </button>
              <button
                  type="submit"
                  className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
                  disabled={isSubmitting}
              >
                {isSubmitting ? 'Cargando...' : '🎯 Ingresar'}
              </button>
            </div>
          </form>

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
