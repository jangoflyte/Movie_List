import React, {useEffect, useState} from 'react';

export const Watched = () => {
    const [watchedList, setWatchedList] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/watched`)
          .then((response) => response.json())
          .then((data) => setWatchedList(data));
    });

    return (
      <div>
        <h1>Watched Movies:</h1>
        {watchedList.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </div>
    );
};