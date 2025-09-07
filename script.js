// Define API endpoints for fetching trending movies, images, and search queries
const APIURL = "https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

// Get references to DOM elements
const main = document.getElementById("content"); // Container for movie cards
const form = document.getElementById("form");    // Search form
const search = document.getElementById("search"); // Search input

// Fetch and display trending movies on initial page load
getMovies(APIURL);

// Function to fetch movies from a given URL and present them
async function getMovies(url) {
    // Fetch data from the TMDb API
    const resp = await fetch(url);
    const respData = await resp.json();
    console.log(respData); // Log data for debugging
    showMovies(respData.results); // Display movies
}

// Function to render movie cards on the page
function showMovies(movies) {
    // Clear existing movie cards/content
    main.innerHTML = "";
    movies.forEach((movie) => {
        // Destructure required movie fields
        const { poster_path, title, vote_average, overview } = movie;
        // Create movie card element
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        // Populate card with image, title, rating, and overview
        movieEl.innerHTML = `
            <img
                src="${IMGPATH + poster_path}"
                alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
        `;
        // Add card to the page
        main.appendChild(movieEl);
    });
}

// Function to return a color class based on movie rating
function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";   // Highly rated
    } else if (vote >= 5) {
        return "orange";  // Average rated
    } else {
        return "red";     // Poorly rated
    }
}

// Add event listener for search form submission
form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form's default behavior (page reload)
    const searchTerm = search.value; // Get user's search text
    if (searchTerm) {
        // Fetch and display movies matching the search term
        getMovies(SEARCHAPI + searchTerm);
        search.value = ""; // Clear search input
    }
});
