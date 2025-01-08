const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 3000;

// Configuración para TMDb
const TMDB_API_KEY = 'cd4e85c37b62ad394d5cac49943dfcde'; // Reemplaza con tu API Key de TMDb
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Middleware para habilitar CORS
app.use(cors());

// Middleware para analizar el cuerpo de las solicitudes JSON
app.use(express.json());

// Servir archivos estáticos (por ejemplo, HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para obtener las películas desde el archivo JSON
app.get('/api/peliculas', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'peliculas.json'), 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).send('Error al leer el archivo de películas.');
        }
        const peliculas = JSON.parse(data);
        res.json(peliculas);
    });
});

// Ruta para agregar una nueva película al archivo JSON
app.post('/api/peliculas', (req, res) => {
    const newMovie = req.body;

    // Leer el archivo de películas y agregar la nueva película
    fs.readFile(path.join(__dirname, 'data', 'peliculas.json'), 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).send('Error al leer el archivo de películas.');
        }

        const peliculas = JSON.parse(data);
        peliculas.push(newMovie);

        // Guardar el archivo de películas actualizado
        fs.writeFile(path.join(__dirname, 'data', 'peliculas.json'), JSON.stringify(peliculas, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error al guardar la película.');
            }
            res.status(200).send('Película agregada correctamente.');
        });
    });
});

// Ruta para obtener detalles de una película desde TMDb
app.get('/api/tmdb/:id', async (req, res) => {
    const movieId = req.params.id;
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}`, {
            params: {
                api_key: TMDB_API_KEY,
                language: 'es-ES'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error al obtener los datos de TMDb:', error);
        res.status(500).send('Error al obtener los datos de la película desde TMDb.');
    }
});

// Iniciar el servidor en el puerto 3000
app.listen(port, () => {
    console.log(`Servidor corriendo en http://127.0.0.1:${port}`);
});
