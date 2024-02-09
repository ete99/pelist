import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import MovieDetail from "../../components/MovieDetail";

// Mock the fetchMovieDetails function
jest.mock("../../services/dataService", () => {
  return () =>
    Promise.resolve({
      Title: "Mock Movie Title",
      Year: "2022",
      Rated: "R",
      Released: "15 Oct 1999",
      Runtime: "139 min",
      Genre: "Drama",
      Director: "Mock Director",
      Writer: "Chuck Palahniuk, Jim Uhls",
      Actors: "Actor One, Actor Two, Actor Three",
      Plot: "Mock plot description",
      Language: "English",
      Country: "Germany, United States",
      Awards: "Nominated for 1 Oscar. 12 wins & 38 nominations total",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
      Ratings: [
        {
          Source: "Internet Movie Database",
          Value: "7.5/10",
        },
        {
          Source: "Rotten Tomatoes",
          Value: "79%",
        },
        {
          Source: "Metacritic",
          Value: "67/100",
        },
      ],
      Metascore: "67",
      imdbRating: "7.5",
    });
});

describe("MovieDetail component", () => {
  test("renders movie details for a valid movie ID", async () => {
    render(
      <MemoryRouter initialEntries={["/movies/123"]}>
        <Routes>
          <Route path="/movies/:id" element={<MovieDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for data to be fetched
    await screen.findByText(/Mock Movie Title/i);

    // Assert that loading skeleton is not rendered after data is loaded
    expect(screen.queryByTestId("loading-skeleton")).toBeNull();

    // Assert that movie details are rendered
    expect(screen.getByText(/Mock Movie Title/i)).toBeInTheDocument();
    expect(screen.getByText(/2022/i)).toBeInTheDocument();
    expect(screen.getByText(/7.5/i)).toBeInTheDocument();
    expect(screen.getByText(/Mock plot description/i)).toBeInTheDocument();
    expect(screen.getByText(/Mock Director/i)).toBeInTheDocument();
    expect(screen.getByText(/Actor One/i)).toBeInTheDocument();
    expect(screen.getByText(/Actor Two/i)).toBeInTheDocument();
    expect(screen.getByText(/Actor Three/i)).toBeInTheDocument();
  });
});
