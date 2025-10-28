import React, { useState } from 'react';
import { validarRut, validarCorreo } from '../utils/validarRut.js';
import '../css/style.css';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    rut: '',
    email: '',
    numero: '',
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nombre, rut, email, numero } = formData;

    if (!nombre.trim()) {
      alert('El nombre es obligatorio');
      return;
    }
    if (!validarRut(rut)) {
      alert('El RUT no es válido');
      return;
    }
    if (!validarCorreo(email)) {
      alert('El correo no es válido');
      return;
    }
    if (!numero.trim()) {
      alert('El número es obligatorio');
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const nuevoUsuario = { nombre, rut, email, numero, password: rut };

    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Usuario registrado correctamente!');
    setFormData({ nombre: '', rut: '', email: '', numero: '' });
    setShowPopup(false);
  };

  return (
    <>
      <button onClick={() => setShowPopup(true)}>Registrarse</button>

      {showPopup && (
        <div className="overlay">
          <div className="rgform">
            <button className="close" onClick={() => setShowPopup(false)}>X</button>
            <form onSubmit={handleSubmit}>
              <h2>Registro</h2>

              <label htmlFor="nombre">Nombre:</label>
              <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} />

              <label htmlFor="rut">RUT:</label>
              <input type="text" id="rut" name="rut" value={formData.rut} onChange={handleChange} />

              <label htmlFor="email">Correo:</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />

              <label htmlFor="numero">Número:</label>
              <input type="text" id="numero" name="numero" value={formData.numero} onChange={handleChange} />

              <button type="submit" className="btn-submit">Enviar</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;