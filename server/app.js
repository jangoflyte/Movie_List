const express =  require('express');
const app = express();
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV||'development']);
const cors = require('cors');
const { application } = require('express');
app.use(express.json());
app.use(cors());

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
    knex
        .select('*')
        .from("movies")
        .orderBy("id", "asc")
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
});

app.get("/movies/:id", function (req, res) {
  let {id} = req.params;
  if (req.body === null ) {
    res.status(200).send("Movie does not exist");
  } else {
    knex
        .select("*")
        .from("movies")
        .where({ "movies.id": id })
        .orderBy("id", "asc")
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(500).json(err));
  }
});

app.post("/movies", function (req, res) {
  knex("movies")
    .insert(req.body)
    .then(res.status(202).send({message: `${req.body.title} added successfully`}))
    .catch((err) => res.status(500).json(err));
});

app.patch("/movies", function (req, res) {
  knex("movies")
    .where({id: req.body.id})
    .update({
        title: req.body.title,
    })
    .then(res.status(200).send({ message: `Movie ID ${req.body.id} change to ${req.body.title}`}))
    .catch((err) => res.status(500).json(err));
});

app.put("/movies", function (req, res) {
  knex("movies")
    .where({ id: req.body.id })
    .update({
      title: req.body.title,
    })
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
  knex("movies")
    .where({ id: req.body.id })
    .del()
    .then(
      res.status(200).send({
        message: `Movie ID ${req.body.id} deleted out of movie list`,
      })
    )
    .catch((err) => res.status(500).json(err));
});

app.delete("/movies/:id", function (req, res) {
  let {id} = req.params;
  knex("movies")
    .where({ id: id })
    .del()
    .then(
      res.status(200).send({
        message: `Movie deleted out of movie list`,
      })
    )
    .catch((err) => res.status(500).json(err));
});

app.all('*', (req, res) => {
    res.status(400).json("Endpoint does not exist");
});

module.exports = app;