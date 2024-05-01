import React, { useState, useEffect } from "react";
import "./App.css";
import Search from "./Components/Search";
import Results from "./Components/Results";
import MoviePage from "./Components/MoviePage";

const API_URL = "https://www.omdbapi.com/?";
const API_KEY = "&apikey=3d1445fb";

function App() {
  const [search, setSearch] = useState({
    searchTerm: "",
    year: "",
    results: [],
    selected: {},
    isLoading: false,
  });

  // Hanterar ändringar i title-inputfältet,
  // uppdaterar tillståndet "search" baserat på föregående tillstånd,
  // behåller befintliga tillståndsvariabler
  // och uppdaterar "searchTerm" till det nya värdet från inputfältet
  const handleTitleInput = (event) => {
    setSearch((previousState) => {
      return {
        ...previousState,
        searchTerm: event.target.value,
      };
    });
  };

  // Hanterar ändringar i year-inputfältet,
  // uppdaterar tillståndet "search" baserat på föregående tillstånd,
  // behåller befintliga tillståndsvariabler
  // och uppdaterar "year" till det nya värdet från inputfältet
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
      setSearch((previousState) => {
        return {
          ...previousState,
          results: [],
          isLoading: true,
        };
      });
      const response = await fetch(
        API_URL + "s=" + search.searchTerm + "&y=" + search.year + API_KEY
      );
      const data = await response.json();

      // Uppdaterar tillståndet "search" baserat på föregående tillstånd,
      // behåller befintliga tillståndsvariabler
      // och uppdaterar "results" med sökresultat från omdb
      setSearch((previousState) => {
        return {
          ...previousState,
          isLoading: false,
          results: data.Search || [],
        };
      });
    }
  };

  const moviePage = async (id) => {
    const response = await fetch(API_URL + "i=" + id + API_KEY);
    const data = await response.json();

    // Uppdaterar tillståndet "search" baserat på föregående tillstånd,
    // behåller befintliga tillståndsvariabler
    // och uppdaterar "selected" med den valda filmen
    setSearch((previousState) => {
      return { ...previousState, selected: data };
    });
  };

  // Uppdaterar tillståndet "search" baserat på föregående tillstånd,
  // behåller befintliga tillståndsvariabler
  // och återställer "selected" till ett tomt objekt för att stänga detaljsidan
  const closePage = () => {
    setSearch((previousState) => {
      return { ...previousState, selected: {} };
    });
  };

  // Används för att köra kod när komponenten mountas
  // och utför en sökning vid komponentens första render
  useEffect(() => {
    Search("");
  }, []);

  return (
    <div className="app-container">
      {search.selected.Title != null ? (
        <MoviePage selected={search.selected} closePage={closePage} />
      ) : (
        <div className="search-engine">
          <header>
            <h1>Flux Capacitor Search Engine</h1>
            <Search
              handleTitleInput={handleTitleInput}
              handleYearInput={handleYearInput}
              searchResult={searchResult}
              searchTerm={search.searchTerm}
              year={search.year}
            />
            {search.isLoading && <div>Is Loading...</div>}

            <div className="row-container">
              {search.results.length > 0 ? (
                search.results.map((result) => (
                  <Results
                    key={result.id}
                    result={result}
                    moviePage={moviePage}
                  />
                ))
              ) : (
                <p>No results</p>
              )}
            </div>
          </header>
        </div>
      )}
    </div>
  );
}

export default App;
