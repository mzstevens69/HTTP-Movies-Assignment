import React, { useState, useEffect } from 'react';
import axios from 'axios';


const initialState = {
  
  name: '',
  director: '',
  metascore: '',
  stars: []
};

const UpdateMovie = props => {
  const [newMovie, setNewMovie] = useState(initialState);
    const id = props.match.params.id
  useEffect(() => {
    axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            setNewMovie(res.data);
            console.log(res.data);
        })
        .catch(err => console.log(err));
}, [id]);

  const changeHandler = e => {
    e.persist();
    let value = e.target.value;
    if (e.target.name === 'stars') {
      value = [value]
    }

    setNewMovie({
      ...newMovie,
      [e.target.name]: value, id: id
    });
  };
  
  const handleSubmit = e => {
    e.preventDefault();
    
    axios
      .put(`http://localhost:5000/api/movies/${newMovie.id}`, newMovie)
      .then(res => {
       
        setNewMovie(res.data)
        props.history.push(`/movies/${newMovie.id}`, newMovie)
      })
      .catch(err => console.log(err));
  };
   
 

  return (
    <div className='form-wrapper'>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Title"
          value={newMovie.title}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={newMovie.director}
        />
        <div className="baseline" />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
          value={newMovie.metascore}
        />
        <div className="baseline" />

        <input
          type="text"
          name="stars"
          onChange={changeHandler}
          placeholder="Stars"
          value={newMovie.stars}
        />
        <div className="baseline" />

        <button  className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default UpdateMovie;