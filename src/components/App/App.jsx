import React from "react";
import './App.css';
import {Pagination, Alert} from "antd";
import SearchInput from "../SearchInput/SearchInput";
import Filter from "../Filter/Filter";
import MovieCardsList from "../MovieCardsList/MovieCardsList";
import Api from "../../api/api";
import Loader from "../Loader/Loader";

class App extends React.Component {

  api = new Api();

  state = {
    movies: [],
    searchField: '',
    loading: true,
    error: false
  };

  componentDidMount() {
    this.api.getPopularMovies().then(data => {
      this.setState({
        movies: [...data],
        loading: false
      })
    }).catch(this.onError);
  };

  onChangeInput = (event) => {
    this.setState({
      searchField: (event.target.value).toLowerCase(),
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const {searchField} = this.state;
    this.api.getMovies(searchField)
      .then(data => {
        this.setState({
          movies: [...data],
          loading: false,
          error: false
        });
      }).catch(this.onError);
  };
  
  onError = () => {
    this.setState({
      error: true,
      loading: false
    });
  };

  render() {
    const {movies, loading, error} = this.state;
    const errorMsg = error ? <Alert type="error" message="Не удалось загрузить список фильмов!" banner /> : null;
    const alertMsg = !error && movies.length === 0
      ? <Alert message="Не удалось найти указанный фильм!" banner closable/>
      : null;
    const loader = loading ? <Loader /> : <MovieCardsList movies={movies}/>;

    return (
      <div className='container'>
        <Filter/>
        <SearchInput onSubmit={this.onSubmit}
                     onChangeInput={this.onChangeInput} />
        <div className='cards'>
          {loading ? null : alertMsg}
          {loader}
          {error ? errorMsg : null}
        </div>
        <div className='pag'>
          <Pagination defaultCurrent={1} total={50}/>
        </div>
      </div>
    );
  };
}

export default App;
