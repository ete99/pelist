// MovieList.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import MovieList from "../../components/MovieList";

describe("MovieList Component", () => {
  test("renders MovieList component", () => {
    render(<MovieList />);

    // Assert that the search input and year filter select are present
    expect(screen.getByPlaceholderText("Search titles")).toBeInTheDocument();
    expect(screen.getByTestId("year-filter-select")).toBeInTheDocument();
  });
});
