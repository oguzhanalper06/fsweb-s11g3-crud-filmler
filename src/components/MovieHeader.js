import React from "react";
import { Link } from "react-router-dom";

const MovieHeader = () => {
  return (
    <div>
      <h2>IMDB Movie Database</h2>
      <div className="flex items-center gap-2">
        <Link to="/movies" className="myButton bg-blue-600 hover:bg-blue-500">
          Tüm filmler
        </Link>
        <Link
          to="/movies/add"
          className="myButton bg-green-700 hover:bg-green-600"
        >
          <i className="material-icons text-sm">&#xE147;</i>
          <span>Yeni film ekle</span>
        </Link>
      </div>
    </div>
  );
};

export default MovieHeader;
