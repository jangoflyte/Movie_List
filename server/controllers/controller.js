const knex = require("./dbConnection");

function getMovies() {
  return knex
    .select("*")
    .from("movies")
    .orderBy("id", "asc");
}

function getMovieByID(id) {
  return knex
    .select("*")
    .from("movies")
    .where({ "movies.id": id })
    .orderBy("id", "asc");
}

function createMovie(movie) {
  return knex("movies")
    .insert(movie);
}

function updateMovie(movie) {
  return knex("movies")
    .where({ id: movie.id })
    .update({
      title: movie.title,
    });
}

function changeMovie(movie) {
  return knex("movies")
    .where({ id: movie.id })
    .update({
      title: movie.title,
    });
}

function deleteMovie(movie) {
  return knex("movies")
    .where({ id: movie.id })
    .del();
}

function deleteMovieByID(id) {
  return knex("movies")
    .where({ id: id })
    .del();
}

function getWatched() {
  return knex
    .select("*")
    .from("movies")
    .where({ watched: true })
    .orderBy("id", "asc");
}

function changeToWatched(id) {
  return knex("movies")
    .where({ id: id })
    .update({
      watched: true,
    });
}

function getUnwatched() {
  return knex
    .select("*")
    .from("movies")
    .where({ watched: false })
    .orderBy("id", "asc");
}

module.exports = { 
  getMovies, 
  getMovieByID, 
  createMovie, 
  updateMovie,
  changeMovie,
  getWatched, 
  getUnwatched, 
  changeToWatched,
  deleteMovie,
  deleteMovieByID
};
