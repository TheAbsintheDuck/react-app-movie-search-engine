import React from "react";
import "../App.css";

function Search({ handleTitleInput, handleYearInput, searchResult }) {
  return (
    <div className="search-container">
      <input
        className="title-input"
        type="text"
        placeholder="Title"
        name="title"
        onChange={handleTitleInput}
        onKeyDown={searchResult}
      />
      <input
        className="year-input"
        type="text"
        placeholder="Year"
        name="year"
        onChange={handleYearInput}
        onKeyDown={searchResult}
      />
    </div>
  );
}
export default Search;
