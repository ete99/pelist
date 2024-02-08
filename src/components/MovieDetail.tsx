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

  const fetchMovieDetails = async (id: string | undefined) => {
    if (!id) {
      toast.error("Invalid movie ID");
      return;
    }

    try {
      const response = await omdbapiAxiosInstance({
        params: {
          i: id,
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
        className={"h-96 w-full object-cover"}
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
          <p className="ml-1">{movie.imdbRating || <Skeleton />} / 10</p>
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
