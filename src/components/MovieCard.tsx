import React from "react";
import { Link } from "react-router-dom";

interface Movie {
  Title: string;
  Year: string;
  Poster: string;
  Rating: string;
  Plot: string;
  imdbID: string;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID}>
      <div className="flex flex-col justify-center align-middle border border-gray-300 rounded-md p-4 shadow-md m-2 cursor-pointer">
        <div className=" flex flex-col justify-between w-32">
          <div>
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="h-48 w-32 rounded-md mb-2 object-cover object-center"
            />
            <h2 className="tituloTruncado text-lg font-bold mb-2 text-ellipsis h-14 block">
              {movie.Title}
            </h2>
          </div>
          <p className="text-sm text-gray-600 mb-2">{movie.Plot}</p>

          <p className="text-sm text-gray-600 mb-2">{movie.Rating}</p>

          <div className="flex flex-row justify-between align-middle">
            <div className="flex justify-end align-middle">
              <p className="text-gray-600 h-4 text-sm">{movie.Year}</p>
            </div>
            <button className="bg-blue-500 text-white rounded-md px-2 text-sm ">
              +
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
