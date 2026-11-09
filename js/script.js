const movieContainer = document.getElementById("movie-list");
const serieContainer = document.getElementById("series-list");
const topRatedMovieContainer = document.getElementById("top-rated-movies-list");
const topRatedSeriesContainer = document.getElementById("top-rated-series-list");

import { BASE_URL, IMG_URL, fetchDataFromApi } from './api.js';
const errorMessage = "Något gick fel, försök igen!";

//movie
async function getMovies(){
    try {
        const data = await fetchDataFromApi(`/movie/popular`);
        showMovies(data.results.slice(0, 10));
    } catch (error) {
        movieContainer.innerHTML = `<p>${errorMessage} </p>`
    }
}

function showMovies(movies){
    movieContainer.innerHTML = "";    

    movies.forEach(function(movie) {
        movieContainer.innerHTML += `
        <div class = "movie-card">
            <img src='${IMG_URL}${movie.poster_path}' 
            placeholder='${movie.title} poster'
            alt='${movie.title} poster'>
            <h3>${movie.title}</h3>
            <p>Release Date: ${movie.release_date}</p>
            <p>Rating: ${movie.vote_average}</p>
        </div>
        `;
    });

}

//Serie
async function getSeries(){

    try {
        const data = await fetchDataFromApi(`/tv/popular`);
    showSeries(data.results.slice(0, 10));
    } catch (error) {
        serieContainer.innerHTML = `<p>${errorMessage} </p>`
    }

    
}

function showSeries(series){
    serieContainer.innerHTML = "";

    series.forEach(function(show) {
        serieContainer.innerHTML += `
        <div class = "serie-card">
            <img src='${IMG_URL}${show.poster_path}' 
            placeholder='${show.name} poster'
            alt='${show.name} poster'>
            <h3>${show.name}</h3>
            <p>First Air Date: ${show.first_air_date}</p>
            <p>Rating: ${show.vote_average}</p>
        </div>
        `;
    });
}
//topRatedMovies
async function getTopRatedMovies(){
    try {
        const data = await fetchDataFromApi(`/movie/top_rated`);
        showTopRatedMovies (data.results.slice(0, 10));
    } catch (error) {
        topRatedMovieContainer.innerHTML = `<p>${errorMessage} </p>`;
    }
}

function showTopRatedMovies(top_rated) {
    topRatedMovieContainer.innerHTML = "";
    
    top_rated.forEach(function(top) {
        topRatedMovieContainer.innerHTML += `
        <div class = "topRatedMovie-card">
            <img src='${IMG_URL}${top.poster_path}' 
            placeholder='${top.title} poster'
            alt='${top.title} poster'>
            <h3>${top.title}</h3>
            <p>Release Date: ${top.release_date}</p>
            <p>Rating: ${top.vote_average}</p>
        </div>
        `;
    });
}

//topRatedSeries
async function getTopRatedSeries(){
    try {
        const data = await fetchDataFromApi(`/tv/top_rated`);
        showTopRatedSeries (data.results.slice(0, 10));
    } catch (error) {
        topRatedSeriesContainer.innerHTML = `<p>${errorMessage} </p>`;
    }
}

function showTopRatedSeries(top_rated) {
    topRatedSeriesContainer.innerHTML = "";
    
    top_rated.forEach(function(top) {
        topRatedSeriesContainer.innerHTML += `
        <div class = "topRatedSeries-card">
            <img src='${IMG_URL}${top.poster_path}' 
            placeholder='${top.name} poster'
            alt='${top.name} poster'>
            <h3>${top.name}</h3>
            <p>First Air Date: ${top.first_air_date}</p>
            <p>Rating: ${top.vote_average}</p>  
        </div>
        `;
    });
}

getMovies();
getSeries();
getTopRatedMovies();
getTopRatedSeries();
