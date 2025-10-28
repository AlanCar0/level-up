// src/utils/validarRut.js

export function validarRut(rut) {
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
  dvEsperado =
    dvEsperado === 11 ? "0" : dvEsperado === 10 ? "K" : dvEsperado.toString();

  return dv === dvEsperado;
}

export function validarCorreo(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}