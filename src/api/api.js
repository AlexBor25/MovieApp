import API_KEY from '../constants/key';
import API_URL from '../constants/apiURL';

class Api {
  getMovies = async (filmName) => {
    const res = await fetch(`${API_URL}search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${filmName}`);
    if (!res.ok) throw new Error(`Произошла ошибка, код ${res.status}`);
    const data = await res.json();
    return data.results;
  };

  getPopularMovies = async () => {
    const res = await fetch(`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
    if (!res.ok) throw new Error(`Произошла ошибка, код ${res.status}`);
    const data = await res.json();
    return data.results;
  };
}

export default Api;
