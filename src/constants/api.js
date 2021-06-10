import key from "./key";

class Api {

  apiUrl = 'https://api.themoviedb.org/3/';

  getMovies = async (filmName) => {
    const res = await fetch(`${this.apiUrl}search/movie?api_key=${key}&language=en-US&page=1&include_adult=false&query=${filmName}`);
    const data = await res.json();
    console.log(data.results)
    return data.results;
  }
}

export default Api;