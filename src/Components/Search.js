import React from "react";
import "../App.css";

function Search({ handleInput, searchResult }) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Enter title or year..."
        name="movie"
        onChange={handleInput}
        onKeyDown={searchResult}
      ></input>
    </div>
  );
}
export default Search;
