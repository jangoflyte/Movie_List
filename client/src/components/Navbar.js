import React, {useContext, useState} from 'react';
import {MovieContext} from '../App';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'
import '../App.css';

const Banner = styled.h1`
  text-align: center;
  text-decoration: none;
`;

export const Navbar = () => {
  const {input, setInput, favorites, setFavorites} = useContext(MovieContext)
  const [addMovie, setAddMovie] = useState("");
  const navigate = useNavigate();
  
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
    .then(() => handleFavoriteList())
    .catch(err => console.log(err));
  };

  const handleFavoriteList = () => {
    setFavorites(addMovie);
  };

  //console.log(favorites);

  const handleFavorite = (e) => {
    e.preventDefault();
    navigate("/favorites");
  };

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
      <Banner>
        <a href="/">Movie List</a>
      </Banner>
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
        <button onClick={handleAdd}>Add</button>
        <button style={{ marginLeft: "1%" }} onClick={handleFavorite}>
          Favorites
        </button>
        <button style={{ marginLeft: "20%" }} onClick={handleWatched}>
          Watched List
        </button>
        <button style={{ marginLeft: "5%" }} onClick={handleToWatch}>
          Watch List
        </button>
      </form>
    </div>
  );
}