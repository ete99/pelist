/**
 * Represents a movie card component.
 * Displays information about a movie, including its title, poster, short plot, rating, and year.
 * Allows the user to navigate to the movie details page and add the movie to their collection.
 */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Movie from "../interfaces/movie.interface";
import Skeleton from "react-loading-skeleton";
import { FaStar } from "react-icons/fa";
import { fetchMovieDetails } from "../services/dataService";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [fullMovie, setFullMovie] = useState<Movie>();

  useEffect(() => {
    if (movie.Plot && movie.imdbRating) {
      setFullMovie(movie);
    } else {
      fetchMovieDetails(movie.imdbID).then((data: Movie | any) => {
        setFullMovie(data);
      });
    }
  }, [movie]);

  return (
    <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID}>
      <div className="flex flex-col justify-center align-middle border border-stone-800 rounded-md p-3 shadow-md m-2 cursor-pointer">
        <div className=" flex flex-col justify-between w-32">
          <div>
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="h-48 w-32 rounded-md object-cover object-center"
              onError={(e) => {
                e.currentTarget.src = "/logo512.png";
              }}
            />
            <h2 className="truncado-2 text-lg font-bold my-1 text-ellipsis h-14 block">
              {movie.Title}
            </h2>
          </div>
          <div className="text-xs text-gray-600 mb-2 h-12 truncado-3">
            {fullMovie?.Plot ? (
              <p>{fullMovie.Plot}</p>
            ) : (
              <div data-testid="skeleton-plot">
                <Skeleton />
              </div>
            )}
          </div>

          <div className="flex flex-row justify-between align-middle">
            <div className="flex justify-end align-middle">
              <p className="text-gray-600 h-4 text-sm">{movie.Year}</p>
            </div>
            <div className="flex flex-row items-start  text-sm text-gray-600 mb-2 align-middle">
              <div className="flex align-middle">
                <FaStar className="h-5" />
              </div>
              <div className="ml-1 flex flex-row">
                {fullMovie?.imdbRating ? (
                  <p>{fullMovie.imdbRating}</p>
                ) : (
                  <div className="w-5" data-testid="skeleton-rating">
                    <Skeleton />
                  </div>
                )}
                <p className="ml-0.5">/10</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
