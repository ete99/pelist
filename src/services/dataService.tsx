import Movie from "../interfaces/movie.interface";
import omdbapiService from "./omdbapiService";
/**
 * Fetches movie details from the OMDB API.
 * @param id - The ID of the movie to fetch details for.
 * @param plot - The plot type for the movie details (optional, defaults to "short").
 * @returns A promise that resolves to the movie details or an error object.
 */
export const fetchMovieDetails = async (
  id: string | undefined,
  plot: "full" | "short" = "short"
) => {
  if (!id) {
    return { Error: "Invalid movie ID" };
  }

  try {
    const response = await omdbapiService({
      params: {
        i: id,
        plot: plot,
      },
    });
    return response.data;
  } catch (error) {
    // console.error(error);
    return error;
  }
};

/**
 * Fetches movies based on the provided search term and year filter.
 * @param {Object} options - The options for fetching movies.
 * @param {string | undefined} options.searchTerm - The search term to filter movies by.
 * @param {string | undefined} options.yearFilter - The year filter to filter movies by.
 * @returns {Promise<void>} - A promise that resolves when the movies are fetched.
 */
export const fetchMovies = async ({
  searchTerm,
  yearFilter,
}: {
  searchTerm: string | undefined;
  yearFilter: string | undefined;
}) => {
  let queryParams = {};
  if (searchTerm) {
    queryParams = { s: searchTerm };
  }
  if (yearFilter) {
    queryParams = { ...queryParams, y: yearFilter };
  }

  try {
    const response = await omdbapiService({
      params: queryParams,
    });

    if (response.data.Error) {
      return { movies: [], error: response.data.Error };
    }

    return { movies: response.data.Search };
  } catch (error) {
    console.error("Error fetching movies:", error);
    return { movies: [], error };
  }
};

const dataService = {
  fetchMovieDetails,
  fetchMovies,
};

export default dataService;
