// test/validarRut.test.js

function validarRut(rut) {
  rut = rut.replace(/\./g, "").replace(/-/g, "");
  if (rut.length < 8) return false;

  let cuerpo = rut.slice(0, -1);
  let dv = rut.slice(-1).toUpperCase();
  let suma = 0;
  let multiplo = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += multiplo * parseInt(cuerpo[i]);
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }

  let dvEsperado = 11 - (suma % 11);
  dvEsperado = dvEsperado === 11 ? "0" : dvEsperado === 10 ? "K" : dvEsperado.toString();

  return dv === dvEsperado;
}

function validarCorreo(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// TESTS CON RUTS QUE SÍ SON VÁLIDOS
describe('Validación de RUT', () => {
  it('debería validar RUT correctamente formateado', () => {
    // RUTs VERDADERAMENTE válidos
    expect(validarRut('12.345.678-5')).toBe(true);  // Este SÍ es válido
    expect(validarRut('12345678-5')).toBe(true);    // Sin puntos también
  });

  it('debería rechazar RUTs inválidos', () => {
    expect(validarRut('12.345.678-9')).toBe(false); // DV incorrecto
    expect(validarRut('123')).toBe(false);          // Muy corto
    expect(validarRut('')).toBe(false);             // Vacío
  });
});

describe('Validación de Correo', () => {
  it('debería validar correos correctos', () => {
    expect(validarCorreo('test@test.com')).toBe(true);
    expect(validarCorreo('usuario@gmail.com')).toBe(true);
  });

  it('debería rechazar correos inválidos', () => {
    expect(validarCorreo('correo@')).toBe(false);
    expect(validarCorreo('@dominio.com')).toBe(false);
  });
});