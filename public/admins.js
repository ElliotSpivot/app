// Obtener los elementos del formulario
const movieForm = document.getElementById('movieForm');
const movieName = document.getElementById('name');
const movieYear = document.getElementById('year');
const movieCover = document.getElementById('cover');
const movieLink = document.getElementById('movie');

// Escuchar el evento de submit
movieForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que la página se recargue

    // Crear el objeto con los datos de la película
    const movieData = {
        name: movieName.value,
        year: movieYear.value,
        cover: movieCover.value,
        movie: movieLink.value
    };

    fetch('http://127.0.0.1:3000/api/peliculas', {  // Asegúrate de usar el puerto correcto
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movieData)
    })
    
    // Enviar la película al servidor
    fetch('/api/peliculas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movieData)
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Mostrar el mensaje del servidor
        movieForm.reset(); // Limpiar el formulario
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
