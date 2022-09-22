import React from 'react';

export const Added_Movies = () => {
    const handleDelete = (id) => {
      fetch(`http://localhost:8080/movies/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .catch((err) => console.log(err));
    };

    return (
        <div>
            <h1>List of added movies:</h1>
        </div>
    )
}