import React from "react";
import './App.css';
import SearchInput from "../SearchInput/SearchInput";
import Filter from "../Filter/Filter";
import MovieCardsList from "../MovieCardsList/MovieCardsList";
import Api from "../../api/api";

const debounce = require('lodash.debounce');

class App extends React.Component {

  api = new Api();

  state = {
    movies: [],
    searchField: '',
    loading: true,
    error: false,
    currentPage: 1,
    totalResults: 0,
    showPagination: true,
  };

  debounceFn = debounce(this.getData.bind(this), 1500);

  componentDidMount() {
    const {currentPage} = this.state;
    this.api.getPopularMovies(currentPage).then(data => {
      this.setState({
        movies: [...data.results],
        loading: false,
        totalResults: data.total_results,
        showPagination: false
      })
    }).catch(this.onError);
  };

  getData (searchField) {
    this.api.getMovies(searchField).then(data => {
      this.setState({
        movies: [...data.results],
        loading: false,
        error: false,
        showPagination: true,
        totalResults: data.total_results
      });
    }).catch(this.onError);
  };

  onChangeInput = (event) => {
    this.setState({
      searchField: (event.target.value).toLowerCase(),
      loading: true,
      showPagination: true,
    });
    this.debounceFn(event.target.value)
  };
  
  onError = () => {
    this.setState({
      error: true,
      loading: false
    });
  };

  onChangePage = (pageNumber) => {
    const {searchField} = this.state;
    this.setState({
      loading: true
    });
    this.api.getMovies(searchField, pageNumber).then(data => {
      this.setState({
        currentPage: data.page,
        totalResults: data.total_results,
        movies: [...data.results],
        loading: false,
      });
    });
  };

  render() {
    const {movies, loading, error, totalResults, currentPage, showPagination} = this.state;

    return (
      <div className='container'>
        <Filter/>
        <SearchInput onChangeInput={this.onChangeInput} />
        <div className='cards'>
          <MovieCardsList movies={movies}
                          loading={loading}
                          totalResults={totalResults}
                          currentPage={currentPage}
                          showPagination={showPagination}
                          onChangePage={this.onChangePage}
                          error={error} />
        </div>
      </div>
    );
  };
}

export default App;
