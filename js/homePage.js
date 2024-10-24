import { fetchMovieData } from "./api.js";
import { makeCards } from "./cardsMaker.js";

async function displayMovies() {
  let movies = await fetchMovieData();
  makeCards(movies);
}

displayMovies();
