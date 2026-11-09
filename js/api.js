export const API_KEY = 'b2ec054cb58f7a01dc9d1c33c3fd49d8';
export const BASE_URL = 'https://api.themoviedb.org/3';
export const IMG_URL = 'https://image.tmdb.org/t/p/w500';

export async function fetchDataFromApi(endpoint){
    const response = await fetch (`${BASE_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${API_KEY}`);
    if (!response.ok) {
        throw new Error('http-fel');
    }
     return response.json();
}