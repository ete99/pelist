/* eslint-disable testing-library/no-node-access */
import { render, screen } from "@testing-library/react";
import MovieCard from "../../components/MovieCard";
import { BrowserRouter } from "react-router-dom";
import Movie from "../../interfaces/movie.interface";

describe("MovieCard", () => {
  it("renders movie card with provided movie data", () => {
    render(
      <BrowserRouter>
        <MovieCard movie={movieDetails} />
      </BrowserRouter>
    );

    expect(screen.getByText(movieDetails.Title)).toBeInTheDocument();
    expect(screen.getByAltText(movieDetails.Title)).toBeInTheDocument();
    expect(screen.getByText(movieDetails.Plot)).toBeInTheDocument();
    expect(screen.getByText(`${movieDetails.imdbRating}`)).toBeInTheDocument();
    expect(screen.getByText(movieDetails.Year)).toBeInTheDocument();
  });

  it("renders skeleton loaders while fetching movie details", () => {
    let simpleMovie: Movie = movieDetails;

    delete simpleMovie.Plot;
    delete simpleMovie.imdbRating;

    render(
      <BrowserRouter>
        <MovieCard movie={simpleMovie} />
      </BrowserRouter>
    );

    expect(screen.getByTestId("skeleton-plot")).toBeInTheDocument();
    expect(screen.getByTestId("skeleton-rating")).toBeInTheDocument();
  });

  it("triggers navigation when clicked on the card", () => {
    const { container } = render(
      <BrowserRouter>
        <MovieCard movie={movieDetails} />
      </BrowserRouter>
    );
    // eslint-disable-next-line testing-library/no-container
    const cardLink = container.querySelector("a");

    expect(cardLink).toHaveAttribute("href", `/movie/${movieDetails.imdbID}`);
  });

  it("displays default poster when image fails to load", () => {
    render(
      <BrowserRouter>
        <MovieCard movie={movieDetails} />
      </BrowserRouter>
    );

    const moviePoster = screen.getByAltText(movieDetails.Title);
    expect(moviePoster).toHaveAttribute("src", movieDetails.Poster);
  });
});

const movieDetails = {
  Title: "Fight Club",
  Year: "1999",
  Rated: "R",
  Released: "15 Oct 1999",
  Runtime: "139 min",
  Genre: "Drama",
  Director: "David Fincher",
  Writer: "Chuck Palahniuk, Jim Uhls",
  Actors: "Brad Pitt, Edward Norton, Meat Loaf",
  Plot: "A nameless first person narrator (Edward Norton) attends support groups in attempt to subdue his emotional state and relieve his insomniac state. When he meets Marla (Helena Bonham Carter), another fake attendee of support groups, his life seems to become a little more bearable. However when he associates himself with Tyler (Brad Pitt) he is dragged into an underground fight club and soap making scheme. Together the two men spiral out of control and engage in competitive rivalry for love and power.",
  Language: "English",
  Country: "Germany, United States",
  Awards: "Nominated for 1 Oscar. 12 wins & 38 nominations total",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
  Ratings: [
    {
      Source: "Internet Movie Database",
      Value: "8.8/10",
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
  imdbRating: "8.8",
  imdbVotes: "2,287,043",
  imdbID: "tt0137523",
  Type: "movie",
  DVD: "19 Nov 2014",
  BoxOffice: "$37,030,102",
  Production: "N/A",
  Website: "N/A",
  Response: "True",
};
