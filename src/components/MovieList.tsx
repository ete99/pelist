import React, { useState, useEffect } from "react";
import { omdbapiAxiosInstance } from "../utils/omdbapiAxiosInstance";
import MovieCard from "./MovieCard";
import LoadingIndicator from "./LoadingIndicator";
import toast from "react-hot-toast";
import Select from "react-select";

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 70 }, (_, index) => currentYear - index);

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

    try {
      const response = await omdbapiAxiosInstance({
        params: queryParams,
      });

      if (response.data.Error) {
        setMovies([]);
        setError(response.data.Error);
        return;
      }

      setMovies(response.data.Search);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
      toast.error("Failed to fetch movies");
    } finally {
      setLoading(false);
    }
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
    selectedOption: { value: string; label: string } | null
  ) => {
    setYearFilter(selectedOption?.value || "");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex row mb-4">
        <input
          type="text"
          placeholder="Search titles"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border-2 border-stone-800 ml-2 rounded-md py-2 px-4 mr-2 h-10 focus:outline-none focus:border-blue-500"
        />
        <div>
          <Select
            value={yearFilter ? { value: yearFilter, label: yearFilter } : null}
            onChange={handleYearFilterChange}
            options={[
              { value: "", label: "Select Year" }, // Default empty option
              ...years.map((year) => ({
                value: year.toString(),
                label: year.toString(),
              })),
            ]}
            placeholder="Year"
            className="ml-2 w-28 h-11 react-select-border"
            styles={{
              control: (provided) => ({
                ...provided,
                border: "2px solid",
                borderRadius: "0.375rem",
              }),
            }}
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center align-middle">
        {loading && <LoadingIndicator />}

        {searchTerm && !loading && (!movies || movies.length === 0) && (
          <p className="text-center w-full">{error}</p>
        )}
        {movies?.map((movie: any) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
