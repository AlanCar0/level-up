describe('Validación de Teléfono Chileno', () => {
  
  const validarTelefono = (telefono) => {
    const numeroLimpio = telefono.replace(/\s/g, '').replace(/[-+()]/g, '');
    return /^(9|569)[0-9]{8}$/.test(numeroLimpio);
  };

  it('debería validar formatos chilenos correctos', () => {
    // Formatos válidos
    expect(validarTelefono('912345678')).toBe(true);
    expect(validarTelefono('56912345678')).toBe(true);
    expect(validarTelefono('+56912345678')).toBe(true);
    expect(validarTelefono('9 1234 5678')).toBe(true);
  });

  it('debería rechazar formatos incorrectos', () => {
    expect(validarTelefono('812345678')).toBe(false); // No empieza con 9
    expect(validarTelefono('91234')).toBe(false);     // Muy corto
    expect(validarTelefono('abc')).toBe(false);       // Letras
  });
});