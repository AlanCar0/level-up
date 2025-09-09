
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
  



const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total');
const contenedorCarrito = document.getElementById('carrito');


//Revisa primero que todo sea existente en la pagina

if (listaCarrito && totalCarrito && contenedorCarrito) {

    // Recupera carrito perdura entre recargas de la pagina guardandolo en localtorage si no crea un array vacio
    let carrito = [];
    try {
        carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    } catch {
        carrito = [];
    }

    //Renderiza el recorrido de todos los productos del carrito con su precio y su boton de elminar
    function render() {
        listaCarrito.innerHTML = '';
        let total = 0;

        carrito.forEach((item, idx) => {
            const li = document.createElement('li');
            li.innerHTML = `
      ${item.nombre} - $${Number(item.precio).toLocaleString('es-CL')} CLP
      <button class="btn-eliminar" data-index="${idx}">❌</button>
    `;
            listaCarrito.appendChild(li);
            total += Number(item.precio);
        });

        totalCarrito.textContent = `Total: $${total.toLocaleString('es-CL')} CLP`;
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    // Boton de Agregar al carrito dependiendo de la clase producto
    document.querySelectorAll('.btn-carrito').forEach(btn => {
        btn.addEventListener('click', () => {
            const nombre = btn.dataset.nombre || 'Producto';
            const precio = parseInt(btn.dataset.precio, 10) || 0;
            carrito.push({ nombre, precio });
            render();
        });
    });

    // Eliminar producto del contenedor carrito
    contenedorCarrito.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-eliminar')) {
            const idx = parseInt(e.target.dataset.index, 10);
            if (!Number.isNaN(idx)) {
                carrito.splice(idx, 1);
                render();
            }
        }
    });

    //Renderiza el Carrito
    render();
}
main
