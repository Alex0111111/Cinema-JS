// search.js

const apiKey = '39811d2d'; // Votre clé API
const searchBar = document.getElementById('search-bar');
const searchResults = document.getElementById('search-results');
const loadMoreButton = document.getElementById('load-more');

let currentSearch = ''; // La recherche en cours
let currentPage = 1; // Page actuelle des résultats

// Fonction pour récupérer les résultats de recherche
async function fetchSearchResults(query, page = 1) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}&page=${page}`);
        const data = await response.json();

        if (data.Response === "True") {
            return data.Search || [];
        } else {
            console.error(data.Error);
            return [];
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        return [];
    }
}

// Fonction pour afficher les résultats de recherche dans le DOM
function renderSearchResults(movies) {
    movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.className = 'movie';
        movieDiv.innerHTML = `
            <img src="${movie.Poster !== "N/A" ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title} poster">
            <h3>${movie.Title}</h3>
            <a href="movie.html?id=${movie.imdbID}">More Details</a>
        `;
        searchResults.appendChild(movieDiv);
    });
}

// Écouteur d'événement pour la barre de recherche
searchBar.addEventListener('input', async (event) => {
    const query = event.target.value.trim();

    // Si la recherche a changé, réinitialisez les résultats
    if (query !== currentSearch) {
        currentSearch = query;
        currentPage = 1;
        searchResults.innerHTML = ''; // Efface les anciens résultats

        if (query) {
            const movies = await fetchSearchResults(query);
            renderSearchResults(movies);
        }
    }
});

// Écouteur d'événement pour le bouton "Load More"
loadMoreButton.addEventListener('click', async () => {
    if (currentSearch) {
        currentPage++;
        const movies = await fetchSearchResults(currentSearch, currentPage);
        renderSearchResults(movies);
    }
});
