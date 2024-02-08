import React, { useState, useEffect } from "react";
import { omdbapiAxiosInstance } from "../utils/omdbapiAxiosInstance";
import MovieCard from "./MovieCard";
import LoadingIndicator from "./LoadingIndicator";

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, index) => currentYear - index);

  /**
   * Fetches movies based on the provided search term and year filter.
   * @param {Object} options - The options for fetching movies.
   * @param {string | undefined} options.searchTerm - The search term to filter movies by.
   * @param {string | undefined} options.yearFilter - The year filter to filter movies by.
   * @returns {Promise<void>} - A promise that resolves when the movies are fetched.
   */
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

    if (Object.keys(queryParams).length === 0) {
      setMovies([]);
      setLoading(false);
      return;
    }

    const response = await omdbapiAxiosInstance({
      params: queryParams,
    });
    setMovies(response.data.Search);
    setLoading(false);
  };

  /**
   * Fetches movies based on the provided search term and year filter.
   * This effect will be triggered whenever the search term or year filter changes.
   */
  useEffect(() => {
    fetchMovies({ searchTerm, yearFilter });
  }, [searchTerm, yearFilter]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleYearFilterChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setYearFilter(event.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search titles"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border-2 border-stone-800 ml-2 rounded-md py-2 px-4 mr-2 h-11 focus:outline-none focus:border-blue-500"
        />
        <select
          value={yearFilter}
          onChange={handleYearFilterChange}
          className="border-2 border-stone-800 rounded-md py-2 px-4 h-11 focus:outline-none focus:border-blue-500"
        >
          <option value="">Year</option>

          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap justify-center align-middle">
        {loading && <LoadingIndicator />}

        {searchTerm && !loading && (!movies || movies.length === 0) && (
          <p className="text-center w-full">No movies found.</p>
        )}
        {movies?.map((movie: any) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
