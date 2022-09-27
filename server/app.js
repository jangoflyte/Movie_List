const express =  require('express');
const cors = require("cors");
const morgan = require('morgan');
const app = express();
//const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV||'development']);

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

const {
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
} = require("./controllers/controller");

// const movies = [
//   { title: "Mean Girls" },
//   { title: "Hackers" },
//   { title: "The Grey" },
//   { title: "Sunshine" },
//   { title: "Ex Machina" },
// ];

app.get('/', function(req, res) {
    res.status(200).send('Welcome to my API :)')
});

app.get("/movies", function (req, res) {
//   res.status(200).json(movies);
  getMovies()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err));
});

app.get("/movies/:id", function (req, res) {
  let {id} = req.params;
  if (req.body === null ) {
    res.status(200).send("Movie does not exist");
  } else {
    getMovieByID(id)
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(500).json(err));
  }
});

app.post("/movies", function (req, res) {
  let movie = req.body;
  createMovie(movie)
    .then(res.status(202).send({message: `${req.body.title} added successfully`}))
    .catch((err) => res.status(500).json(err));
});

app.patch("/movies", function (req, res) {
  let movie = req.body;
  updateMovie(movie)
    .then(res.status(200).send({ message: `Movie ID ${req.body.id} change to ${req.body.title}`}))
    .catch((err) => res.status(500).json(err));
});

app.put("/movies", function (req, res) {
  let movie = req.body;
  changeMovie(movie)
    .then(
      res
        .status(200)
        .send({
          message: `Movie ID ${req.body.id} change to ${req.body.title}`,
        })
    )
    .catch((err) => res.status(500).json(err));
});

app.delete("/movies", function (req, res) {
  let movie = req.body;
  deleteMovie(movie)
    .then(
      res.status(200).send({
        message: `Movie ID ${req.body.id} deleted out of movie list`,
      })
    )
    .catch((err) => res.status(500).json(err));
});

app.delete("/movies/:id", function (req, res) {
  let {id} = req.params;
  deleteMovieByID(id)
    .then(
      res.status(200).send({
        message: `Movie deleted out of movie list`,
      })
    )
    .catch((err) => res.status(500).json(err));
});

app.get("/watched", function (req, res) {
  getWatched()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json(err));
});

app.patch("/movies/:id", function (req, res) {
  let {id} = req.params
  changeToWatched(id)
    .then(
      res
        .status(200)
        .send({
          message: `Movie ${req.body.id} change to watched`,
        })
    )
    .catch((err) => res.status(500).json(err));
});

app.get("/unwatched", function (req, res) {
  getUnwatched()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json(err));
});

app.all('*', (req, res) => {
    res.status(400).json("Endpoint does not exist");
});

module.exports = app;