import React, { useState, useEffect } from "react";
import "./App.css";
import Search from "./Components/Search";
import Results from "./Components/Results";
import MoviePage from "./Components/MoviePage";

const API_URL = "http://www.omdbapi.com/?";
const API_KEY = "&apikey=3d1445fb";

function App() {
  const [search, setSearch] = useState({
    searchTerm: "",
    year: "",
    results: [],
    selected: {},
  });

  const handleTitleInput = (event) => {
    setSearch((previousState) => {
      return {
        ...previousState,
        searchTerm: event.target.value,
      };
    });
  };

  const handleYearInput = (event) => {
    setSearch((previousState) => {
      return {
        ...previousState,
        year: event.target.value,
      };
    });
  };

  const searchResult = async (event) => {
    if (event.key === "Enter") {
      const response = await fetch(
        API_URL + "s=" + search.searchTerm + "&y=" + search.year + API_KEY
      );
      const data = await response.json();

      setSearch((previousState) => {
        return { ...previousState, results: data.Search || [] };
      });
    }
  };

  const moviePage = async (id) => {
    const response = await fetch(API_URL + "i=" + id + API_KEY);
    const data = await response.json();

    setSearch((previousState) => {
      return { ...previousState, selected: data };
    });
  };

  const closePage = () => {
    setSearch((previousState) => {
      return { ...previousState, selected: {} };
    });
  };

  useEffect(() => {
    Search("");
  }, []);

  return (
    <div className="app-container">
      {typeof search.selected.Title != "undefined" ? (
        <MoviePage selected={search.selected} closePage={closePage} />
      ) : (
        <div className="search-engine">
          <header>
            <h1>Flux Capacitor Search Engine</h1>
            <Search
              handleTitleInput={handleTitleInput}
              handleYearInput={handleYearInput}
              searchResult={searchResult}
            />
            <div className="row-container">
              {search.results.map((result) => (
                <Results
                  key={result.id}
                  result={result}
                  moviePage={moviePage}
                />
              ))}
            </div>
          </header>
        </div>
      )}
    </div>
  );
}

export default App;
