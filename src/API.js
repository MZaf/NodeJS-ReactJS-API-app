const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = "337fce80e5b3d697f5fa0e01a6b275e2";
// Search Movies query URL 
const SEARCH_BASE_URL = `${API_URL}search/movie?api_key=${API_KEY}&query=`;
// TOP RATED Movies URL
const TOP_RATED_URL =`${API_URL}movie/top_rated?api_key=$(API_KEY)&language=en-US&page=1`
// Popular Movies URL
const POPULAR_BASE_URL = `${API_URL}movie/popular?api_key=${API_KEY}`;

const FILTER_BASE_URL = `${API_URL}movie/popular?api_key=${API_KEY}&page=5`;

const IMAGE_BASE_URL = "http://image.tmdb.org/t/p/";

const BACKDROP_SIZE = "w1280";

const POSTER_SIZE = "w500";

export {
  SEARCH_BASE_URL,
  POPULAR_BASE_URL,
  TOP_RATED_URL,
  FILTER_BASE_URL,
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE,
};