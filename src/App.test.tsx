import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders search input", () => {
  render(<App />);
  const searchInput = screen.getByPlaceholderText(/search titles/i);
  expect(searchInput).toBeInTheDocument();
});

test("renders year input", () => {
  render(<App />);
  const yearInput = screen.getByText(/year/i);
  expect(yearInput).toBeInTheDocument();
});
