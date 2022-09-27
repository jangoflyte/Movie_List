import React, {useEffect, useState} from 'react';
import { Navbar } from './components/Navbar';
import { Routes, Route } from "react-router-dom";
import { Results } from './components/Results';
import { Added_Movies } from './components/Added_Movies';
import { Watched } from './components/Watched';
import { To_Watch } from './components/To_Watch';

export const MovieContext = React.createContext();

export function App() {
  const [movieList, setMovieList] = useState([])
  const [results, setResults] = useState([]);
  const [input, setInput] = useState("");
  const [watched, setWatched] = useState(false)

  console.log("watch state", watched);
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
    .then(data => {
      setMovieList(data);
      setResults(data);
    })
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/movies/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
  };

  const handleWatched = (id) => {
    fetch(`http://localhost:8080/watched/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        watched: true,
      }),
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
  };

  const movieObj = {
    movieList,
    setMovieList,
    input,
    setInput,
    results,
    setResults
  };

  return (
    <MovieContext.Provider value={movieObj}>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ul>
              {movieList.map((movie) => (
                <li key={movie.id}>
                  {movie.title}
                  <button
                    style={{ marginLeft: "10%" }}
                    onClick={() => handleWatched}
                  >
                    Watched
                  </button>
                  <button style={{ marginLeft: "10%" }} onClick={handleDelete}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          }
        ></Route>
        <Route path="/results" element={<Results />}></Route>
        <Route path="/added" element={<Added_Movies />}></Route>
        <Route path="/watched" element={<Watched />}></Route>
        <Route path="/towatch" element={<To_Watch />}></Route>
      </Routes>
    </MovieContext.Provider>
  );
}


