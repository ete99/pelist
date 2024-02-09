import { fetchMovieDetails } from "../../services/dataService";
import { omdbapiService } from "../../services/omdbapiService";

jest.mock("../../services/omdbapiService");

describe("fetchMovieDetails function", () => {
  it("returns movie details when provided with a valid ID", async () => {
    const movieId = "validID";
    const responseData = {
      Title: "Inception",
      Year: "2010",
      Plot: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    };

    (omdbapiService as any).mockResolvedValueOnce({ data: responseData });

    const movieDetails = await fetchMovieDetails(movieId);

    expect(omdbapiService).toHaveBeenCalledWith({
      params: {
        i: movieId,
        plot: "short",
      },
    });

    expect(movieDetails).toEqual(responseData);
  });

  it("returns an error message when provided with an invalid ID", async () => {
    const invalidMovieId = undefined;
    const expectedError = { Error: "Invalid movie ID" };

    const movieDetails = await fetchMovieDetails(invalidMovieId);

    expect(movieDetails).toEqual(expectedError);
  });

  it("returns an error message when an error occurs during the request", async () => {
    const movieId = "validID";
    const errorMessage = "Request failed with status code 404";

    (omdbapiService as any).mockRejectedValueOnce(new Error(errorMessage));

    const movieDetails = await fetchMovieDetails(movieId);

    expect(movieDetails).toEqual(new Error(errorMessage));
  });
});
