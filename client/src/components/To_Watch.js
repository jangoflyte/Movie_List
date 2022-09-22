import React, { useEffect, useState } from "react";

export const To_Watch = () => {
    const [watchList, setWatchList] = useState([]);

    useEffect(() => {
      fetch(`http://localhost:8080/unwatched`)
        .then((response) => response.json())
        .then((data) => setWatchList(data));
    });

    return (
      <div>
        <h1>Watch List:</h1>
        {watchList.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </div>
    );
};