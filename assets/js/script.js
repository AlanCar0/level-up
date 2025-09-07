// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    const imagenes = document.querySelectorAll('.carrusel-img');
    let indice = 0;

    // Si no hay imágenes, salir
    if (imagenes.length === 0) return;

    // Mostrar la imagen actual y ocultar las demás
    function mostrarImagen() {
        imagenes.forEach((img, i) => {
            img.classList.toggle('activo', i === indice);
        });
        indice = (indice + 1) % imagenes.length; // siguiente índice
    }

    // Mostrar la primera imagen de inmediato
    mostrarImagen();

    // Cambiar imagen cada 3 segundos si hay más de una
    if (imagenes.length > 1) {
        setInterval(mostrarImagen, 3000);
    }
});