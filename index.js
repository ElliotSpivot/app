// Seleccionar elementos
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const body = document.querySelector('body');

// Añadir evento para mostrar/ocultar el menú
menuToggle.addEventListener('click', (event) => {
    // Prevenir que el clic en el icono de menú cierre el menú inmediatamente
    event.stopPropagation();
    navLinks.classList.toggle('show');
    menuToggle.classList.toggle('open'); // Cambiar el icono a "X" o hamburguesa
});

// Cerrar el menú si se hace clic fuera de él
body.addEventListener('click', () => {
    if (navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
        menuToggle.classList.remove('open');
    }
});

// Evitar que el clic en el menú cierre el menú
navLinks.addEventListener('click', (event) => {
    event.stopPropagation();
});
