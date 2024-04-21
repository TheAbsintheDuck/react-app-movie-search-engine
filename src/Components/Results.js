import React from "react";
import "../App.css";

function Results({ result, moviePage }) {
  return (
    <div className="result-container">
      <img
        src={result.Poster}
        alt="POSTER MISSING"
        onClick={() => moviePage(result.imdbID)}
      />
      <h3>
        {result.Title} ({result.Year})
      </h3>
    </div>
  );
}

export default Results;
