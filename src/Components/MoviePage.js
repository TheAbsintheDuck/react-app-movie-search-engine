import React from "react";
import "../App.css";

function MoviePage({ selected, closePage }) {
  return (
    <div className="movie-page-container">
      <div>
        <img src={selected.Poster} alt="POSTER MISSING" />
      </div>
      <div className="info-container">
        <h1>
          {selected.Title} ({selected.Year})
        </h1>
        <p>{selected.Plot}</p>
        <p>Rating: {selected.imdbRating}</p>
        <button onClick={closePage}>Close</button>
      </div>
    </div>
  );
}
export default MoviePage;
