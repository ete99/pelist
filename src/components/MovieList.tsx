import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import LoadingIndicator from "./LoadingIndicator";
import Select from "react-select";
import { fetchMovies } from "../services/dataService";

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
   * This effect will be triggered whenever the search term or year filter changes.
   */
  useEffect(() => {
    setLoading(true);
    fetchMovies({ searchTerm, yearFilter }).then((res) => {
      if (res.error) {
        setError(res.error);
        setMovies([]);
      } else {
        setMovies(res.movies);
      }
      setLoading(false);
    });
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
      <div className="flex flex-row flex-wrap mb-4">
        <input
          type="text"
          placeholder="Search titles"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border-2 border-stone-800 ml-2 mb-2 rounded-md py-2 px-4 mr-2 h-10 focus:outline-none focus:border-blue-500"
        />
        <div data-testid="year-filter-select">
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
