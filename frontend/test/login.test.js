// test/login.test.js
describe('Lógica de Autenticación', () => {
  
  const usuarios = [
    { email: 'usuario@test.com', password: '123456', nombre: 'Usuario Test' },
    { email: 'admin@test.com', password: 'admin123', nombre: 'Admin Test' }
  ];

  const autenticarUsuario = (email, password) => {
    return usuarios.find(user => 
      user.email === email && user.password === password
    );
  };

  it('debería autenticar usuario válido', () => {
    const usuario = autenticarUsuario('usuario@test.com', '123456');
    
    expect(usuario).toBeDefined();
    expect(usuario.nombre).toBe('Usuario Test');
  });

  it('debería rechazar credenciales incorrectas', () => {
    const usuario = autenticarUsuario('usuario@test.com', 'password-incorrecta');
    
    expect(usuario).toBeUndefined();
  });

  it('debería rechazar usuario no existente', () => {
    const usuario = autenticarUsuario('noexiste@test.com', '123456');
    
    expect(usuario).toBeUndefined();
  });
});