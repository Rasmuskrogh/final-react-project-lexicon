import { useEffect, useState } from "react";
import { NewMoviesContext } from "./NewMoviesContext";
import { IMovies } from "../../interfaces";
import {
  getDislikedMovies,
  getLikedMovies,
  getMovies,
  getSeenMovies,
  postDislikedMovies,
  postLikedMovies,
  postSeenMovies,
} from "../../requests";

function NewMoviesProvider({ children }: { children: React.ReactNode }) {
  const [movies, setMovies] = useState<IMovies[]>([]);
  const [dislikedMovies, setDislikedMovies] = useState<IMovies[]>([]);
  const [likedMovies, setLikedMovies] = useState<IMovies[]>([]);
  const [seenMovies, setSeenMovies] = useState<IMovies[]>([]);

  const addMovieToDislikedMovies = async (movieId: string | undefined) => {
    if (movieId)
      try {
        const values = await Promise.all([
          postDislikedMovies(movieId),
          getDislikedMovies(),
        ]);
        console.log("disliked movies values", values);
        console.log("disliked movies values[1]", values[1]);
        console.log("disliked movies values[1].data", values[1].data);
        console.log(
          "disliked movies values[1].data.attributes",
          values[1].data.attributes
        );

        setDislikedMovies(await values[1].data);
        setTimeout(() => {
          console.log(
            "this is disliked movies when added to the disliked movies state with attributes this time",
            dislikedMovies
          );
        }, 2000);
      } catch (error) {
        console.log(error);
      }
  };
  const addMovieToLikedMovies = async (movieId: string | undefined) => {
    if (movieId)
      try {
        const values = await Promise.all([
          postLikedMovies(movieId),
          getLikedMovies(),
        ]);
        console.log(values[1].data);
        setLikedMovies(values[1].data);
      } catch (error) {
        console.log(error);
      }
  };

  const addMovieToSeenMovies = async (movieId: string | undefined) => {
    if (movieId)
      try {
        const values = await Promise.all([
          postSeenMovies(movieId),
          getSeenMovies(),
        ]);
        console.log(values[1].data);
        setSeenMovies(values[1].data);
      } catch (error) {
        console.log(error);
      }
  };

  const moveToDisliked = (
    movieId: string | undefined,
    activeButton: number | undefined
  ) => {
    if (activeButton === 0) {
      setLikedMovies(likedMovies.filter((movie) => movie.IMDBId !== movieId));
    } else if (activeButton === 2) {
      setSeenMovies(seenMovies.filter((movie) => movie.IMDBId !== movieId));
    }

    if (movieId)
      setDislikedMovies((prev) => [
        ...prev,
        {
          IMDBId: movieId,
          Poster: "",
          Title: "",
          Genre: "",
          Director: "",
          Actors: "",
          IMDBRating: "",
          RottenTomatoesRating: 0,
          Summary: "",
        },
      ]);
  };

  const moveToLiked = (
    movieId: string | undefined,
    activeButton: number | undefined
  ) => {
    if (activeButton === 1) {
      setDislikedMovies(
        dislikedMovies.filter((movie) => movie.IMDBId !== movieId)
      );
    } else if (activeButton === 2) {
      setSeenMovies(seenMovies.filter((movie) => movie.IMDBId !== movieId));
    }

    if (movieId)
      setLikedMovies((prev) => [
        ...prev,
        {
          IMDBId: movieId,
          Poster: "",
          Title: "",
          Genre: "",
          Director: "",
          Actors: "",
          IMDBRating: "",
          RottenTomatoesRating: 0,
          Summary: "",
        },
      ]);
  };

  const moveToSeen = (
    movieId: string | undefined,
    activeButton: number | undefined
  ) => {
    if (activeButton === 0) {
      setLikedMovies(likedMovies.filter((movie) => movie.IMDBId !== movieId));
    } else if (activeButton === 1) {
      setDislikedMovies(
        dislikedMovies.filter((movie) => movie.IMDBId !== movieId)
      );
    }

    if (movieId)
      setSeenMovies((prev) => [
        ...prev,
        {
          IMDBId: movieId,
          Poster: "",
          Title: "",
          Genre: "",
          Director: "",
          Actors: "",
          IMDBRating: "",
          RottenTomatoesRating: 0,
          Summary: "",
        },
      ]);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const moviesData = await getMovies();
      console.log(moviesData.data[0].attributes);
      const dislikedMoviesData = await getDislikedMovies();
      const likedMoviesData = await getLikedMovies();
      const seenMoviesData = await getSeenMovies();
      if (moviesData && moviesData.data) {
        const extractedMovies = moviesData.data.map(
          (movie: any) => movie.attributes
        );
        setMovies(extractedMovies);
      }
      if (dislikedMoviesData && dislikedMoviesData.data) {
        const extractedMovies = dislikedMoviesData.data.map(
          (movie: any) => movie.attributes
        );
        setDislikedMovies(extractedMovies);
      }
      if (seenMoviesData && seenMoviesData.data) {
        const extractedMovies = seenMoviesData.data.map(
          (movie: any) => movie.attributes
        );
        setSeenMovies(extractedMovies);
      }
      if (likedMoviesData && likedMoviesData.data) {
        const extractedMovies = likedMoviesData.data.map(
          (movie: any) => movie.attributes
        );
        setLikedMovies(extractedMovies);
      }
    };
    fetchMovies();
  }, []);

  return (
    <NewMoviesContext.Provider
      value={{
        movies,
        dislikedMovies,
        likedMovies,
        seenMovies,
        addMovieToDislikedMovies,
        addMovieToLikedMovies,
        addMovieToSeenMovies,
        moveToDisliked,
        moveToLiked,
        moveToSeen,
      }}
    >
      {children}
    </NewMoviesContext.Provider>
  );
}

export default NewMoviesProvider;
