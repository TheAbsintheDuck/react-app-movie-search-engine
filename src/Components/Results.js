import React from "react";
import "../App.css";

function Results({ result, moviePage }) {
  return (
    <div className="result-container" onClick={() => moviePage(result.imdbID)}>
      <img src={result.Poster} alt="POSTER MISSING" />
      <h3>
        {result.Title} ({result.Year})
      </h3>
    </div>
  );
}

export default Results;
