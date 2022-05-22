import "./styles.css";

const apiUrl =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const imgPth = "https://image.tmdb.org/t/p/w1280";
const searchApi =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

fetchMovies(apiUrl);
async function fetchMovies(url) {
  const resp = await fetch(url);
  const data = await resp.json();

  //console.log(data);
  show(data.results);
}

function show(movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { poster_path, title, vote_average, overview } = movie;
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");
    movieElement.innerHTML = `
    <img src="${imgPth + poster_path}" alt="${title}" ></img>
 <div class="movie-info">
      <h3>${title}</h3>
      <span class="${getClassByRating(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>Overview :</h3>
        ${overview}
      </div>
    `;
    main.appendChild(movieElement);
  });
  function getClassByRating(vote) {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 5) {
      return "orange";
    } else {
      return "red";
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm) {
      fetchMovies(searchApi + searchTerm);
      search.value = "";
    }
  });
}
