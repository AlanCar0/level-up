
// Abrir y cerrar popup
const openPopupBtn = document.getElementById("openPopupBtn");
const closePopupBtn = document.getElementById("closePopupBtn");
const overlay = document.getElementById("popupOverlay");
const form = document.getElementById("registroForm");

openPopupBtn.addEventListener("click", () => {
    overlay.style.display = "flex";
});
closePopupBtn.addEventListener("click", () => {
    overlay.style.display = "none";
});

// Validar RUT chileno
function validarRut(rut) {
    rut = rut.replace(/\./g, '').replace(/-/g, '');
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

// Validación del formulario
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const rut = document.getElementById("rut").value.trim();
    const email = document.getElementById("email").value.trim();
    const numero = document.getElementById("numero").value.trim();

    if (!validarRut(rut)) {
        alert("❌ RUT inválido");
        return;
    }

    const regexMail = "/^[^\s@]+@[^\s@]+\.[^\s@]+$/";
    if (!regexMail.test(email)) {
        alert("❌ Correo inválido");
        return;
    }

    alert("✅ Registro exitoso!\n\nNombre: " + nombre + "\nRUT: " + rut + "\nCorreo: " + email + "\nNúmero: " + numero);
    overlay.style.display = "none";
    form.reset();
});

