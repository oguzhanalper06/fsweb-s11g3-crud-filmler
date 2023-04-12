import React, { useEffect, useState } from "react";

import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import MovieList from "./components/MovieList";
import Movie from "./components/Movie";
import EditMovieForm from "./components/EditMovieForm";
import MovieHeader from "./components/MovieHeader";
import AddMovieForm from "./components/AddMovieForm";
// DArk Mode
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/GlobalStyled";
import { lightTheme, darkTheme } from "./components/Theme";

import FavoriteMovieList from "./components/FavoriteMovieList";

import axios from "axios";

const App = (props) => {
  const { push } = useHistory();
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [theme, setTheme] = useState(getTheme());
  useEffect(() => {
    axios
      .get("http://localhost:9000/api/movies")
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteMovie = (id) => {
    axios
      .delete(`http://localhost:9000/api/movies/${id}`)
      .then((res) => {
        setMovies(res.data);
        push("/movies");
      })
      .catch((err) => console.log(err));
  };

  const addToFavorites = (movie) => {
    setFavoriteMovies([...favoriteMovies, movie]);
  };

  const removeFromFavorites = (movie) => {
    const copyFavs = [...favoriteMovies];
    const index = copyFavs.indexOf(movie);
    copyFavs.splice(index, 1);
    setFavoriteMovies([...copyFavs]);
  };

  function getTheme() {
    const theme = localStorage.getItem("theme");
    return theme ? theme : "light";
  }
  const themeProvider = () => {
    localStorage.setItem("theme", theme);
  };
  const handleDarkMode = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  useEffect(() => {
    themeProvider();
    getTheme();
  }, [theme]);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <div>
        <nav className="bg-zinc-600 px-6 py-3 theme={theme}">
          <div className="flex justify-between">
            <h1 className="text-xl text-orange-600">
              HTTP / CRUD Film Projesi
            </h1>

            <img
              className="w-10 cursor-pointer hover:animate-pulse "
              onClick={handleDarkMode}
              src="https://cdn2.iconfinder.com/data/icons/images-and-photography-2/24/light-mode-dark-light-512.png"
            />
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-3 pb-4">
          <MovieHeader />
          <div className="flex flex-col sm:flex-row gap-4">
            <FavoriteMovieList favoriteMovies={favoriteMovies} />
            <Switch>
              <Route path="/movies/edit/:id">
                <EditMovieForm movies={movies} setMovies={setMovies} />
              </Route>
              <Route path="/movies/add">
                <AddMovieForm setMovies={setMovies} movies={movies} />
              </Route>
              <Route path="/movies/:id">
                <Movie
                  deleteMovie={deleteMovie}
                  addToFavorites={addToFavorites}
                  removeFromFavorites={removeFromFavorites}
                  favoriteMovies={favoriteMovies}
                />
              </Route>

              <Route path="/movies">
                <MovieList movies={movies} />
              </Route>

              <Route path="/">
                <Redirect to="/movies" />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
