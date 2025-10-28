// test/registro.test.js
describe('Validación de Formulario de Registro', () => {
  
  const validarFormulario = (formData) => {
    const errors = {};
    
    if (!formData.nombre || formData.nombre.length < 2) {
      errors.nombre = 'El nombre debe tener al menos 2 caracteres';
    }
    
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'El correo no es válido';
    }
    
    if (!formData.password || formData.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    return errors;
  };

  it('debería validar formulario correcto', () => {
    const formData = {
      nombre: 'Juan Pérez',
      email: 'juan@email.com',
      password: '123456',
      confirmPassword: '123456'
    };
    
    const errors = validarFormulario(formData);
    
    expect(Object.keys(errors).length).toBe(0);
  });

  it('debería detectar nombre muy corto', () => {
    const formData = {
      nombre: 'J',
      email: 'juan@email.com',
      password: '123456',
      confirmPassword: '123456'
    };
    
    const errors = validarFormulario(formData);
    
    expect(errors.nombre).toBeDefined();
  });

  it('debería detectar correo inválido', () => {
    const formData = {
      nombre: 'Juan Pérez',
      email: 'correo-invalido',
      password: '123456',
      confirmPassword: '123456'
    };
    
    const errors = validarFormulario(formData);
    
    expect(errors.email).toBeDefined();
  });

  it('debería detectar contraseñas que no coinciden', () => {
    const formData = {
      nombre: 'Juan Pérez',
      email: 'juan@email.com',
      password: '123456',
      confirmPassword: 'diferente'
    };
    
    const errors = validarFormulario(formData);
    
    expect(errors.confirmPassword).toBeDefined();
  });
});