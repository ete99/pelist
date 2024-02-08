import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Movie from "../interfaces/movie.interface";
import omdbapiAxiosInstance from "../utils/omdbapiAxiosInstance";
import Skeleton from "react-loading-skeleton";
import { FaStar } from "react-icons/fa";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [fullMovie, setFullMovie] = useState<Movie>();

  useEffect(() => {
    const fetchMovieDetails = async (id: string | undefined) => {
      if (!id) {
        return;
      }

      try {
        const response = await omdbapiAxiosInstance({
          params: {
            i: id,
            plot: "short",
          },
        });
        setFullMovie(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieDetails(movie.imdbID);
  }, [movie.imdbID]);

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
          <p className="text-sm text-gray-600 mb-2 h-10 tituloTruncado">
            {fullMovie?.Plot || <Skeleton />}
          </p>

          <div className="flex flex-row items-start  text-sm text-gray-600 mb-2 align-middle">
            <div className="flex align-middle">
              <FaStar className="h-5" />
            </div>
            <div className="ml-1 w-16 flex flex-row">
              {fullMovie?.imdbRating || (
                <div className="w-5">
                  <Skeleton />
                </div>
              )}
              <p className="ml-0.5">/10</p>
            </div>
          </div>

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
