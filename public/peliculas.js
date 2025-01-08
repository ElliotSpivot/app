const movieList = document.getElementById('movieList');
const modal = document.getElementById('movieModal');
const modalContent = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');

// Función para cerrar el modal
const closeModal = () => {
    modal.style.display = 'none';
    modalContent.innerHTML = ''; // Limpiar el contenido del modal
};

// Cerrar el modal al hacer clic en el botón de cerrar o fuera del modal
modalClose.addEventListener('click', closeModal);
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Obtener las películas del servidor
fetch('/api/peliculas')
    .then(response => response.json())
    .then(movies => {
        if (!movies || movies.length === 0) {
            movieList.innerHTML = '<p>No se han agregado películas aún.</p>';
            return;
        }

        // Mostrar las películas
        movies.forEach(movie => {
            const movieContainer = document.createElement('div');
            movieContainer.classList.add('movie-item');

            // Validar los datos para evitar undefined
            const movieTitle = document.createElement('h3');
            movieTitle.textContent = movie.name || 'Título desconocido';

            const movieYear = document.createElement('p');
            movieYear.textContent = movie.year ? `Año: ${movie.year}` : 'Año desconocido';

            const movieCover = document.createElement('img');
            movieCover.src = movie.cover || 'https://via.placeholder.com/150';
            movieCover.alt = movie.name || 'Sin portada';

            const movieLink = document.createElement('button');
            movieLink.textContent = 'Ver Película';
            movieLink.classList.add('view-movie-button');

            // Mostrar el modal al hacer clic en el botón
            movieLink.addEventListener('click', () => {
                modal.style.display = 'block';
                modalContent.innerHTML = `
                    <img src="${movie.cover || 'https://via.placeholder.com/300'}" alt="${movie.name || 'Sin portada'}" class="modal-cover">
                    <h3>${movie.name || 'Título desconocido'}</h3>
                    <p>${movie.year ? `Año: ${movie.year}` : 'Año desconocido'}</p>
                    <video controls>
                        <source src="${movie.movie || '#'}" type="video/mp4">
                        Tu navegador no soporta la reproducción de video.
                    </video>
                `;
            });

            // Añadir elementos al contenedor de la película
            movieContainer.appendChild(movieCover);
            movieContainer.appendChild(movieTitle);
            movieContainer.appendChild(movieYear);
            movieContainer.appendChild(movieLink);

            // Añadir al contenedor principal
            movieList.appendChild(movieContainer);
        });
    })
    .catch(error => {
        console.error('Error al cargar las películas:', error);
        movieList.innerHTML = '<p>Error al cargar las películas. Inténtalo de nuevo más tarde.</p>';
    });

