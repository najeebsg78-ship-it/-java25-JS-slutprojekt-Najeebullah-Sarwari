const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchResult = document.getElementById("search-results");
const sortSelect = document.getElementById("sort-select");
let currentMovies = [];
let currentSeries = [];
let currentPerson = [];
const noResultsMessage = "Sökningen hittade inga resultat!";
const errorMessage = "Något gick fel, försök igen!";

function getTitle(item) { return item.title || item.name || ''; }
function getRating(item) { return item.vote_average ?? item.popularity ?? 0; }

function sortList(list, value) {
    if (value === "az") {
        list.sort((a, b) => getTitle(a).localeCompare(getTitle(b)));
    } else if (value === "za") {
        list.sort((a, b) => getTitle(b).localeCompare(getTitle(a)));
    } else if (value === "high") {
        list.sort((a, b) => getRating(b) - getRating(a));
    } else if (value === "low") {
        list.sort((a, b) => getRating(a) - getRating(b));
    }
}

import { IMG_URL, fetchDataFromApi } from './api.js';

searchForm.addEventListener("submit", async function(event) {
    event.preventDefault();
    searchResult.innerHTML = "";
    currentMovies = [];
    currentSeries = [];
    currentPerson = [];
    const searchText = searchInput.value.trim();
    if (searchText) {
        await Promise.all([
            searchMovies(searchText),
            searchSeries(searchText),
            searchPerson(searchText)
        ]);
        if (searchResult.innerHTML === "") {
            searchResult.innerHTML = `<p>${noResultsMessage}</p>`;
        }
        clearButton.classList.add("visible"); 
    }   
});

async function searchMovies(searchText){

try {
    const data = await fetchDataFromApi(`/search/movie?query=${searchText}`);

    currentMovies = data.results;  

    showSearchMovie(data.results);

} catch (error) {
    console.error("Error fetching movie", error);
    searchResult.innerHTML = `<p>${errorMessage}</p>`
}
}

function showSearchMovie(movies) {

    movies.forEach(function(movie) {
        searchResult.innerHTML += `
            <div class="movie-card">
                <img src="${IMG_URL}${movie.poster_path}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <p>Release: ${movie.release_date}</p>
                <p>Score: ${movie.vote_average}</p>
            </div>
        `;

    });

}


async function searchSeries(searchText) {
    try {
        const data = await fetchDataFromApi(`/search/tv?query=${searchText}`);
        currentSeries = data.results;
        showSearchSeries(data.results);
        
    } catch (error) {
        console.error("Error fetching series", error);
        searchResult.innerHTML = `<p>${errorMessage}</p>`;
    }
    
}

function showSearchSeries(series) {

    series.forEach(function(show) {
        searchResult.innerHTML += `
        <div class = "serie-card">
            <img src='${IMG_URL}${show.poster_path}' alt='${show.name} poster'>
            <h3>${show.name}</h3>   
            <p>First Air Date: ${show.first_air_date}</p>
            <p>Rating: ${show.vote_average}</p>
        </div>
        `;
    });
}

async function searchPerson(searchText){
    try {
        const data = await fetchDataFromApi(`/search/person?query=${searchText}`);
        currentPerson = data.results;
        showSearchPersons(data.results);
    } catch (error) {
        console.error("Error fetching person", error);
        searchResult.innerHTML = `<p>${errorMessage}</p>`;
    }
    
    
}

function showSearchPersons(persons) {

    persons.forEach(function(person) {
        searchResult.innerHTML += `
        <div class="person-card">
            <img src="${IMG_URL}${person.profile_path}" 
            placeholder="${person.name} poster"
            alt="${person.name}">
            <h3>${person.name}</h3>
            <p>Avdelning: ${person.known_for_department}</p>
            <p>Popularitet: ${person.popularity}</p>
        </div>
        `;
    });


}


const clearButton = document.getElementById("clear-search");

clearButton.addEventListener ("click", function() {
    searchResult.innerHTML = "";
    searchInput.value = "";
    currentMovies = [];
    currentSeries = [];
    currentPerson = [];
    clearButton.classList.remove("visible");
});

sortSelect.addEventListener("change", function() {
    const value = sortSelect.value;

    sortList(currentMovies, value);
    sortList(currentSeries, value);
    sortList(currentPerson, value);



    searchResult.innerHTML = "";
    showSearchMovie(currentMovies);
    showSearchSeries(currentSeries);
    showSearchPersons(currentPerson);
})