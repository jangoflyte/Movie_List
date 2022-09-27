import React, {useContext} from 'react';
import { MovieContext } from '../App';

export const AddedMovies = () => {
    const {favorites} = useContext(MovieContext);
    return (
      <div>
        <h1>List of added movies:</h1>
        <ul>{favorites.map((movies) => (<li>{movies.title}</li>))}</ul>
      </div>
    );
}