import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { omdbapiAxiosInstance } from "../utils/omdbapiAxiosInstance";

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<any>({});

  const fetchMovieDetails = async (id: string | undefined) => {
    console.log(id);
    if (!id) return;

    const response = await omdbapiAxiosInstance({
      params: {
        i: id,
      },
    });
    setMovie(response.data);
  };

  useEffect(() => {
    fetchMovieDetails(id);
  }, [id]);

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <img
        className="h-64 w-full object-cover"
        src={movie.Poster}
        alt={movie.Title}
      />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">{movie.Title}</h2>
        <p className="text-sm text-gray-600 mb-2">{movie.Year}</p>
        <p className="text-sm text-gray-600 mb-2">{movie.Rating}</p>
        <p className="text-base text-gray-800 mb-4">{movie.Plot}</p>
        <p className="text-sm text-gray-700 mb-2">
          <span className="font-semibold">Director:</span> {movie.Director}
        </p>
        <ul className="text-sm text-gray-700 mb-4">
          {movie.Actors &&
            movie.Actors.split(",").map((actor: string) => (
              <li key={actor}>{actor.trim()}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieDetail;
