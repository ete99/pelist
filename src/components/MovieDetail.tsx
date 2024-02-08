/**
 * MovieDetail component displays the details of a movie.
 * It fetches the movie details from the OMDB API using the movie ID.
 * If the movie ID is invalid or the API request fails, it displays an error message.
 * The component also uses Skeleton components to show loading placeholders while the data is being fetched.
 */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { omdbapiAxiosInstance } from "../utils/omdbapiAxiosInstance";
import Skeleton from "react-loading-skeleton";
import { FaStar } from "react-icons/fa";
import ImageLikeSkeleton from "./ImageWithSkeleton";
import toast from "react-hot-toast";

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<any>({});

  /**
   * Fetches the details of the movie with the given ID from the OMDB API.
   * If the ID is invalid, it displays an error message.
   * If the API request fails, it displays an error message.
   * @param id - The ID of the movie.
   */
  const fetchMovieDetails = async (id: string | undefined) => {
    if (!id) {
      toast.error("Invalid movie ID");
      return;
    }

    try {
      const response = await omdbapiAxiosInstance({
        params: {
          i: id,
          plot: "full",
        },
      });
      setMovie(response.data);
      if (response.data.Error) {
        toast.error(response.data.Error);
      }
    } catch (error) {
      toast.error("Failed to fetch movie details");
      // console.error(error);
    }
  };

  useEffect(() => {
    fetchMovieDetails(id);
  }, [id]);

  return (
    <div className="max-w-md mx-auto mt-8 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <ImageLikeSkeleton
        className={"max-h-96 w-full object-contain"}
        src={movie.Poster}
        alt={movie.Title}
      />
      <div className="p-6">
        <div className="inline">
          <h2 className="text-2xl font-bold mb-2 inline">
            {movie.Title || <Skeleton />}
          </h2>
          <p className="text-sm text-gray-600 mb-2 inline ml-2">
            {movie.Year || <Skeleton />}
          </p>
        </div>
        <div className="flex flex-row items-start  text-sm text-gray-600 mb-2 align-middle">
          <div className="flex align-middle">
            <FaStar className="h-5" />
          </div>
          <div className="ml-1 w-16 flex flex-row">
            {movie.imdbRating || (
              <div className="w-5">
                <Skeleton />
              </div>
            )}
            <p className="ml-1">/ 10</p>
          </div>
        </div>
        <p className="text-base text-gray-800 mb-4">
          {movie.Plot || <Skeleton />}
        </p>
        <p className="text-sm text-gray-700 mb-2">
          <span className="font-semibold">Director:</span>{" "}
          {movie.Director || <Skeleton />}
        </p>
        <ul className="text-sm text-gray-700 mb-4">
          {(movie.Actors &&
            movie.Actors.split(",").map((actor: string) => (
              <li key={actor}>{actor.trim()}</li>
            ))) || <Skeleton count={3} />}
        </ul>
      </div>
    </div>
  );
};

export default MovieDetail;
