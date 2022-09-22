import React, {useEffect, useState} from 'react';
import { Navbar } from './components/Navbar';
import { Routes, Route } from "react-router-dom";
import { Results } from './components/Results';

export const MovieContext = React.createContext();

export function App() {
  const [movieList, setMovieList] = useState([])
  // const movies = [
  //   { title: "Mean Girls" },
  //   { title: "Hackers" },
  //   { title: "The Grey" },
  //   { title: "Sunshine" },
  //   { title: "Ex Machina" },
  // ];

  useEffect(() =>{
    fetch(`http://localhost:8080/movies`)
    .then(res => res.json())
    .then(data => setMovieList(data))
  }, []);

  const movieObj = {
    movieList,
    setMovieList,
  };

  return (
    <MovieContext.Provider value={movieObj}>
      <Navbar />
      <ul>
        {movieList.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
      <Routes>
        <Route path="/results" element={<Results/>}></Route>
      </Routes>
    </MovieContext.Provider>
  );
}


