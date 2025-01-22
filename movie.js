// movie.js

const apiKey = "39811d2d";
const queryParams = new URLSearchParams(window.location.search);
const movieId = queryParams.get("id");

const movieTitle = document.getElementById("movie-title");
const moviePoster = document.getElementById("movie-poster");
const movieSummary = document.getElementById("movie-summary");
const movieGenre = document.getElementById("movie-genre");
const movieActors = document.getElementById("movie-actors");
const movieRatings = document.getElementById("movie-ratings");
const movieDvdRelease = document.getElementById("movie-dvd-release");

// Fetch movie details
async function fetchMovieDetails(id) {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${apiKey}&i=${id}&plot=full`
  );
  const data = await response.json();
  return data;
}

// Render movie details in the DOM
async function renderMovieDetails() {
  if (!movieId) {
    movieTitle.textContent = "Movie not found.";
    return;
  }

  const movie = await fetchMovieDetails(movieId);

  movieTitle.textContent = movie.Title;
  moviePoster.src = movie.Poster;
  moviePoster.alt = `${movie.Title} poster`;
  movieSummary.textContent = movie.Plot;
  movieGenre.textContent = movie.Genre;
  movieActors.textContent = movie.Actors;
  movieRatings.textContent = movie.Ratings.map(
    (rating) => `${rating.Source}: ${rating.Value}`
  ).join(", ");
  const dvdDate = new Date(movie.Released);
  movieDvdRelease.textContent = isNaN(dvdDate)
    ? "N/A"
    : dvdDate.toLocaleDateString("fr-FR");
}

renderMovieDetails();
