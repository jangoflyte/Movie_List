import React, {useContext} from "react";
import { MovieContext } from "../App";

export const Results = () => {
    const { input, results} = useContext(MovieContext);
    // const filteredArray = results
    //   .filter((movie) => {
    //     return movie.title.toLowerCase().includes(input.toLowerCase());
    //   })
    //   .map((movie) => movie.title);
    //console.log(filteredArray);
    return (
      <div>
        <h1>Returned results for: {input}</h1>
        {results
          .filter((movie) => {
            return movie.title.toLowerCase().includes(input.toLowerCase());
          })
          .map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
      </div>
    );
}