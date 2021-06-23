import API_KEY from '../constants/key';
import API_URL from '../constants/apiURL';
import storage from "../utils/storage";

class Api {

  getMovies = async (filmName, pageNumber) => {
    const res = await fetch(`${API_URL}search/movie?api_key=${API_KEY}&language=en-US&page=${pageNumber}&include_adult=false&query=${filmName}`);
    if (!res.ok) throw new Error(`Произошла ошибка, код ${res.status}`);
    const data = await res.json();
    return data;
  };

  getPopularMovies = async (pageNumber) => {
    const res = await fetch(`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNumber}`);
    if (!res.ok) throw new Error(`Произошла ошибка, код ${res.status}`);
    const data = await res.json();
    return data;
  };

  getGenres = async () => {
    const res = await fetch(`${API_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`);
    if (!res.ok) throw new Error(`Произошла ошибка, код ${res.status}`);
    const data = await res.json();
    return data;
  }

  createGuestSession = async () => {
    const res = await fetch(`${API_URL}authentication/guest_session/new?api_key=${API_KEY}`);
    if (!res.ok) throw new Error(`Произошла ошибка, код ${res.status}`);
    const data = await res.json();
    return data;
  }

  getRatedMovies = async (pageNumber = 1) => {
    const res = await fetch(`${API_URL}guest_session/${storage().getId()}/rated/movies?api_key=${API_KEY}&language=en-US&sort_by=created_at.asc&page=${pageNumber}`);
    if (!res.ok) throw new Error(`Произошла ошибка, код ${res.status}`);
    const data = await res.json();
    return data;
  }

  putRating = async (id, value) => {
    const res = await fetch(`${API_URL}movie/${id}/rating?api_key=${API_KEY}&guest_session_id=${storage().getId()}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify({"value": value})
    });
    if (!res.ok) throw new Error(`Произошла ошибка, код ${res.status}`);
    const data = await res.json();
    return data;
  }
}

export default Api;
