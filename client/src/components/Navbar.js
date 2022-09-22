import React, {useContext, useState} from 'react';
import {MovieContext} from '../App';
import { useNavigate } from "react-router-dom";


export const Navbar = () => {
    const {input, setInput} = useContext(MovieContext)
    const [addMovie, setAddMovie] = useState("");
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();
    //console.log(addMovie);
    
    const handleChange = (e) => {
        setInput(e.target.value)
    };

    const handleClick = (e) => {
        e.preventDefault();
        navigate("/results")
    };

    const handleAdd = () => {
        fetch(`http://localhost:8080/movies`, {
            method: "POST",
            body: JSON.stringify({
                title: addMovie
            }),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
        .then(response => response.json())
        .catch(err => console.log(err));
    };

    console.log(favorites);

    const handleWatched = (e) => {
      e.preventDefault();
      navigate("/watched");
    };

    const handleToWatch = (e) => {
      e.preventDefault();
      navigate("/towatch");
    };
    
    return (
      <div>
        <h1 style={{ textAlign: "center", textDecoration: "none" }}>
          <a href="/">Movie List</a>
        </h1>
        <form>
          <input
            type="input"
            name="movie"
            placeholder="search for a movie"
            value={input}
            onChange={handleChange}
          />
          <button onClick={handleClick}>Submit</button>
          <input
            type="input"
            name="add"
            placeholder="add a movie"
            style={{ marginLeft: "20%" }}
            value={addMovie}
            onChange={(e) => setAddMovie(e.target.value)}
          />
          <button onClick={handleAdd}>Favorites</button>
          <button style={{ marginLeft: "20%" }} onClick={handleWatched}>
            Watched
          </button>
          <button style={{ marginLeft: "5%" }} onClick={handleToWatch}>
            To Watch
          </button>
        </form>
      </div>
    );
}