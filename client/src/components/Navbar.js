import React, {useContext, useState} from 'react';
import {MovieContext} from '../App';
import { useNavigate } from "react-router-dom";


export const Navbar = () => {
    const {movieList} = useContext(MovieContext)
    const [input, setInput] = useState("")
    const navigate = useNavigate();

    console.log(input);
    
    const handleChange = (e) => {
        setInput(e.target.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/results")
    };
    return (
      <div>
        <h1 style={{textAlign: "center"}}>Movie List</h1>
        <form>
            <input type="input" name="movie" placeholder="search for a movie" onChange={handleChange} />
            <button onSubmit={() => handleSubmit}>Submit</button>
        </form>
      </div>
    );
}