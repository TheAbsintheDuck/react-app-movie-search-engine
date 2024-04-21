import React, { useState, useEffect } from "react";
import "./App.css";
import Search from "./Components/Search";
import Results from "./Components/Results";
import MoviePage from "./Components/MoviePage";

const API_URL = "http://www.omdbapi.com/?";
const API_KEY = "&apikey=3d1445fb";

function App() {
  //https://www.w3schools.com/react/react_usestate.asp
  const [searchState, setSearchState] = useState({
    search: "",
    results: [],
    selected: {},
  });

  //https://www.w3schools.com/react/react_forms.asp
  //https://www.w3schools.com/react/react_usestate.asp
  const handleInput = (event) => {
    setSearchState((previousState) => {
      return { ...previousState, search: event.target.value };
    });
  };

  const searchResult = async (event) => {
    if (event.key === "Enter") {
      const response = await fetch(
        API_URL + "s=" + searchState.search + API_KEY
      );
      const data = await response.json();

      setSearchState((previousState) => {
        return { ...previousState, results: data.Search || [] };
      });
    }
  };

  const moviePage = async (id) => {
    const response = await fetch(API_URL + "i=" + id + API_KEY);
    const data = await response.json();

    setSearchState((previousState) => {
      return { ...previousState, selected: data };
    });
  };

  const closePage = () => {
    setSearchState((previousState) => {
      return { ...previousState, selected: {} };
    });
  };

  //https://www.w3schools.com/react/react_useeffect.asp
  useEffect(() => {
    Search("");
  }, []);

  return (
    <div className="app-container">
      {typeof searchState.selected.Title != "undefined" ? (
        <MoviePage selected={searchState.selected} closePage={closePage} />
      ) : (
        <div className="search-engine">
          <header>
            <h1>Flux Capacitor Search Engine</h1>
            <Search handleInput={handleInput} searchResult={searchResult} />
            <div className="row-container">
              {searchState.results.map((result) => (
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
