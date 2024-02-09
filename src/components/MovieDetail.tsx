/**
 * MovieDetail component displays the details of a movie.
 * It fetches the movie details from the OMDB API using the movie ID.
 * If the movie ID is invalid or the API request fails, it displays an error message.
 * The component also uses Skeleton components to show loading placeholders while the data is being fetched.
 */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { FaStar } from "react-icons/fa";
import ImageLikeSkeleton from "./ImageWithSkeleton";
import toast from "react-hot-toast";
import { fetchMovieDetails } from "../services/dataService";

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<any>({});

  useEffect(() => {
    fetchMovieDetails(id, "full").then((data: any) => {
      if (data.Error) {
        toast.error(data.Error);
      } else {
        setMovie(data);
      }
    });
  }, [id]);

  return (
    <div className="max-w-md mx-auto mt-8 bg-white border rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <ImageLikeSkeleton
        className={"max-h-96 w-full object-contain"}
        src={movie.Poster}
        alt={movie.Title}
      />
      <div className="px-4 pt-2">
        <div className="inline">
          <h2 className="text-2xl font-bold mb-2 inline">
            {movie.Title || <Skeleton />}
          </h2>
        </div>

        <div className="flex flex-row items-start  text-sm text-gray-600 mb-2 align-middle">
          <div>
            <p className="text-sm text-gray-600">
              {movie.Type || <Skeleton />}
            </p>
          </div>
          <p className="mx-1">{"•"}</p>
          <div>
            <p className="text-sm text-gray-600 mb-2 inline">
              {movie.Year || <Skeleton />}
            </p>
          </div>
          <p className="mx-1">{"•"}</p>
          <div className="flex align-middle">
            <FaStar className="h-5 text-yellow-500" />
          </div>
          <div className="mx-1 flex flex-row">
            {movie.imdbRating || (
              <div className="w-5">
                <Skeleton />
              </div>
            )}
            <p className="ml-0.5"> /10</p>
          </div>
        </div>
        <p className="text-base text-gray-800 mb-4">
          {movie.Plot || <Skeleton />}
        </p>
        <div className="flex space-x-4">
          <p className="text-sm text-gray-700 mb-2">
            <span className="font-semibold">Director:</span>{" "}
            {movie.Director || <Skeleton />}
          </p>
          <div className="flex text-sm text-gray-700 mb-2">
            <span className="font-semibold">Reparto:</span>{" "}
            <ul className="ml-1 text-sm text-gray-700 mb-4 min-w-28">
              {(movie.Actors &&
                movie.Actors.split(",").map((actor: string) => (
                  <li key={actor}>{actor.trim()}</li>
                ))) || <Skeleton count={3} />}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
