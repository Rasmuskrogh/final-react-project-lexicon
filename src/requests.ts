import { API } from "./constant";

export const getMovies = async () => {
  try {
    const response = await fetch(`${API}/movies`);
    if (!response.ok) {
      throw new Error("Network response was not ok, getmovies");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const postDislikedMovies = async (movieId: string | undefined) => {
  try {
    const response = await fetch(`${API}/disliked-movies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          IMDBId: movieId,
        },
      }),
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
export const getDislikedMovies = async () => {
  try {
    const response = await fetch(`${API}/disliked-movies`);
    if (!response.ok) {
      throw new Error("Network response was not ok disliked-movies");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const postLikedMovies = async (movieId: string | undefined) => {
  try {
    const response = await fetch(`${API}/liked-movies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          IMDBId: movieId,
        },
      }),
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
export const getLikedMovies = async () => {
  try {
    const response = await fetch(`${API}/liked-movies`);
    if (!response.ok) {
      throw new Error("Network response was not ok liked-movies");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const postSeenMovies = async (movieId: string | undefined) => {
  try {
    const response = await fetch(`${API}/seen-movies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          IMDBId: movieId,
        },
      }),
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
export const getSeenMovies = async () => {
  try {
    const response = await fetch(`${API}/seen-movies`);
    if (!response.ok) {
      throw new Error("Network response was not ok seen-movies");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
/* export const postUser = async () => {

} */
// export const getMovies = async () => {

// }
