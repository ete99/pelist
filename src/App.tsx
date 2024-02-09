import { Route, Routes } from "react-router-dom";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import NotFound from "./NotFound";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { SkeletonTheme } from "react-loading-skeleton";
import Header from "./Header";

function App() {
  return (
    <>
      <Toaster />
      <SkeletonTheme baseColor="#e3e3e3" highlightColor="#f9f9f9">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SkeletonTheme>
    </>
  );
}

export default App;
