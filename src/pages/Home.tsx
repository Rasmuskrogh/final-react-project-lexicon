import { useContext, useEffect, useState } from "react";
import { IMovies } from "../interfaces";
import Heart from "../assets/heart-home.svg";
import X from "../assets/x.svg";
import Button from "../components/Button";
import { NewMoviesContext } from "../hooks/useContext/NewMoviesContext";

import "../css/home.css";

function Home() {
  const [movie, setMovie] = useState<IMovies | null>(null);
  const [] = useState();
  const [loading, setLoading] = useState<boolean>(true);

  const {
    movies,
    dislikedMovies,
    likedMovies,
    seenMovies,
    addMovieToDislikedMovies,
    addMovieToLikedMovies,
    addMovieToSeenMovies,
    resetAllLists,
  } = useContext(NewMoviesContext);

  const setNewMovie = () => {
    if (movies.length === 0) return;

    const allViewedMovies = [...dislikedMovies, ...likedMovies, ...seenMovies];
    if (allViewedMovies.length === 0) {
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];

      setMovie(randomMovie);
      return;
    }

    const unviewedMovies = movies.filter(
      (movie) =>
        !allViewedMovies.some((viewed) => viewed.IMDBId === movie.IMDBId)
    );

    if (unviewedMovies.length > 0) {
      const singleMovieIndex = Math.floor(
        Math.random() * unviewedMovies.length
      );
      const randomMovie = unviewedMovies[singleMovieIndex];
      setMovie(randomMovie);
    } else {
      console.log("All movies viewed");
      setMovie(null);
    }
  };

  const handleXButtonOnClick = async () => {
    if (movie && !dislikedMovies.some((m) => m.IMDBId === movie.IMDBId)) {
      const movieId = movies.find((m) => m.IMDBId === movie.IMDBId)?.id;
      const IMDBId = movie.IMDBId;
      if (movieId) {
        await addMovieToDislikedMovies(movieId, IMDBId);
      } else {
        console.error("Movie ID not found for the given IMDBId");
      }
    }
  };
  const handleHeartButtonOnClick = async () => {
    if (movie && !likedMovies.some((m) => m.IMDBId === movie.IMDBId)) {
      const movieId = movies.find((m) => m.IMDBId === movie.IMDBId)?.id;
      const IMDBId = movie.IMDBId;
      if (movieId) {
        await addMovieToLikedMovies(movieId, IMDBId);
      } else {
        console.error("Movie ID not found for the given IMDBId");
      }
    }
  };
  const handleSceneitButtonOnClick = async () => {
    if (movie && !seenMovies.some((m) => m.IMDBId === movie.IMDBId)) {
      const movieId = movies.find((m) => m.IMDBId === movie.IMDBId)?.id;
      const IMDBId = movie.IMDBId;
      if (movieId) {
        await addMovieToSeenMovies(movieId, IMDBId);
      } else {
        console.error("Movie ID not found for the given IMDBId");
      }
    }
  };

  const handleResetButton = () => {
    resetAllLists();
  };

  useEffect(() => {
    if (movies.length > 0 && loading) {
      setLoading(false);
      setNewMovie();
    }
  }, [movies]);

  useEffect(() => {
    setNewMovie();
  }, [dislikedMovies, likedMovies, seenMovies]);

  return (
    <>
      {loading ? (
        <h2 className="home-fallback-text">Loading movies...</h2>
      ) : movie ? (
        <section className="wrapper home-section">
          <aside className="home-image-container">
            {movie.Poster && (
              <img
                className="home-image"
                src={movie.Poster}
                alt={movie.Title}
              />
            )}
            <Button
              ClassName="x-button home-button"
              Label={X}
              OnClick={handleXButtonOnClick}
            />

            <Button
              ClassName="sceneit-button home-button"
              Label="Scene It!"
              OnClick={handleSceneitButtonOnClick}
            />
            <Button
              ClassName="heart-button home-button"
              Label={Heart}
              OnClick={handleHeartButtonOnClick}
            />
          </aside>
          <article className="home-content-container">
            <h1 className="home-title">
              {movie.Title || "No title avaliable"}
            </h1>
            <div>
              <h2 className="home-sub-headings">Summary:</h2>
              <p>{movie.Summary || "No summary avaliable"}</p>
            </div>
            <div>
              <h2 className="home-sub-headings">Genre:</h2>
              <p>{movie.Genre || "No genre avaliable"}</p>
            </div>
            <div>
              <h2 className="home-sub-headings">Director:</h2>
              <p>{movie.Director || "No director avaliable"}</p>
            </div>
            <div>
              <h2 className="home-sub-headings">Actors:</h2>
              <p>{movie.Actors || "No actors avaliable"}</p>
            </div>
            <div>
              <h2 className="home-sub-headings">Ratings:</h2>
              <span className="home-ratings">
                IMDB:
                <p>{movie.IMDBRating || "No IMDB rating avalialbr"} / 10</p>
              </span>
              {movie.RottenTomatoesRating && (
                <span className="home-ratings">
                  Rotten Tomatoes: <p>{movie.RottenTomatoesRating}%</p>
                </span>
              )}
            </div>
          </article>
        </section>
      ) : (
        <section className="wrapper home-fallback-section">
          <h2 className="home-fallback-text">
            You have already seen all avaliable movies
          </h2>
          <button
            onClick={handleResetButton}
            className="home-reset-filters-button"
          >
            Reset lists
          </button>
        </section>
      )}
    </>
  );
}

export default Home;
