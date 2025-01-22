document.addEventListener("DOMContentLoaded", ()=> {
    const apiKey = '39811d2d';
    const movietrending = document.getElementById("movies-list");
    const button = document.getElementById("load-more");
    let currentPage = 1;
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=2024&page=${currentPage}`;


    function loadMovie() {
        fetch(url)
        .then(Response => Response.json())
        .then((data) => {
            if(data.Response === 'True') {
                data.Search.forEach((movie) => {
                    const movieDiv = document.createElement("div");
                    movieDiv.classList.add("movie");
                    movieDiv.innerHTML = `
                    <img src="${movie.Poster}" alt="${movie.Title}">
                    <h3>${movie.Title}</h3>
                    <a href="movie.html?id=${movie.imdbID}">Voir plus...</a>`;
                    movietrending.appendChild(movieDiv);
                });
                currentPage++;
            }
            else {
                console.error("Erreur API: ", data.Error);
            }
        })
        .catch((err) => console.error("Erreur de requête: ", err));
    }
    loadMovie();
    button.addEventListener("click", loadMovie)
});