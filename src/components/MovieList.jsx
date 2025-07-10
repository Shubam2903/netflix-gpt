import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  console.log(movies);
  return (
    <div className="px-6">
      <h1 className="text-3xl py-3 text-white">{title}</h1>
      <div className="flex overflow-x-scroll hide-scrollbar">
        <div className="flex  ">
          {Array.isArray(movies) && movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard
                key={movie.id}
                posterPath={movie.poster_path || "No movie available"}
              />
            ))
          ) : (
            <p>No movies found</p> // Or a loading indicator
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
