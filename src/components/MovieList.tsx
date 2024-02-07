import React, { useState, useEffect } from "react";
import { omdbapiAxiosInstance } from "../utils/omdbapiAxiosInstance";
import MovieCard from "./MovieCard";
import LoadingIndicator from "./LoadingIndicator";

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch movies from the API
  const fetchMovies = async ({
    searchTerm,
    yearFilter,
  }: {
    searchTerm: string | undefined;
    yearFilter: string | undefined;
  }) => {
    setLoading(true);
    let queryParams = {};
    if (searchTerm) {
      queryParams = { s: searchTerm };
    }
    if (yearFilter) {
      queryParams = { ...queryParams, y: yearFilter };
    }

    const response = await omdbapiAxiosInstance({
      params: queryParams,
    });
    setMovies(response.data.Search);
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies({ searchTerm, yearFilter });
  }, [searchTerm, yearFilter]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleYearFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setYearFilter(event.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {loading && <LoadingIndicator />}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded-md p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Year"
          value={yearFilter}
          onChange={handleYearFilterChange}
          className="border border-gray-300 rounded-md p-2"
        />
      </div>

      {/* grid that contains the movies */}
      <div className="flex flex-wrap">
        {movies?.map((movie: any) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
