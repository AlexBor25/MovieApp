import React from "react";
import './App.css';
import {Tabs} from "antd";

import SearchInput from "../SearchInput/SearchInput";
import MovieCardsList from "../MovieCardsList/MovieCardsList";
import Api from "../../api/api";
import ContextProvider from "../../constants/context";
import storage from "../../utils/storage";

const { TabPane } = Tabs;
const {saveRating, getRating, getId, saveId, clearStorage} = storage();
const debounce = require('lodash.debounce');

class App extends React.Component {

  api = new Api();

  state = {
    searchMovies: [],
    ratedMovies: [],
    searchField: '',
    loading: true,
    error: false,
    currentPage: 1,
    currentRatedPage: 1,
    totalResults: 0,
    totalRatedResults: 0,
    showPagination: true,
    movieRating: {}
  };

  debounceFn = debounce(this.getData.bind(this), 1500);

  componentDidMount() {
    const {currentPage} = this.state;
    this.api.getPopularMovies(currentPage).then(data => {
      this.setState({
        searchMovies: [...data.results],
        loading: false,
        movieRating: getRating(),
        totalResults: data.total_results,
        showPagination: false
      })
    }).catch(this.onError);
    if(getId() === null) {
      this.api.createGuestSession().then(res => {
        saveId(res.guest_session_id);
      });
    }
    clearStorage();
  };

  getData (searchField) {
    this.api.getMovies(searchField).then(data => {
      this.setState({
        searchMovies: [...data.results],
        loading: false,
        error: false,
        showPagination: true,
        totalResults: data.total_results
      });
    }).catch(this.onError);
  };

  onChangeInput = (event) => {
    if (event.target.value !== '') {
      this.setState({
        searchField: (event.target.value).toLowerCase(),
        loading: true,
        showPagination: true,
      });
      this.debounceFn(event.target.value)
    } else {
      this.setState({
        searchField: (event.target.value).toLowerCase(),
        loading: false,
      });
      this.debounceFn.cancel()
    }
  };
  
  onError = () => {
    this.setState({
      error: true,
      loading: false
    });
  };

  changeRating = (id, value) => {
    const {movieRating} = this.state;
    this.api.putRating(id, value);
    this.setState(({movieRating}) => ({
      movieRating: {...movieRating, [id]: value}
    }));
    saveRating({...movieRating, [id]: value});
  };

  getRatedMovie = (pageNumber = 1) => {
    this.setState({
      loading: true
    });
    this.api.getRatedMovies(pageNumber).then(data => {
      this.setState({
        ratedMovies: [...data.results],
        totalRatedResults: data.total_results,
        currentRatedPage: pageNumber,
        loading: false,
      });
    });
  };

  changeTabs = (key) => {
    if(key === '2') {
      this.getRatedMovie();
    }
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
        searchMovies: [...data.results],
        loading: false,
      });
    });
  };

  onChangeRatedPage = (pageNumber) => {
    this.getRatedMovie(pageNumber);
  };

  render() {
    const {searchMovies, movieRating, currentRatedPage, totalRatedResults, loading, error, totalResults, currentPage, showPagination, ratedMovies} = this.state;

    return (
      <ContextProvider>
        <div className='container'>
          <Tabs className='tabs' centered defaultActiveKey="1" onChange={this.changeTabs}>
            <TabPane tab="Search" key="1">
              <SearchInput onChangeInput={this.onChangeInput} />
              <div className='cards'>
                <MovieCardsList movies={searchMovies}
                                loading={loading}
                                totalResults={totalResults}
                                currentPage={currentPage}
                                movieRating={movieRating}
                                showPagination={showPagination}
                                changeRating={this.changeRating}
                                onChangePage={this.onChangePage}
                                error={error} />
              </div>
            </TabPane>
            <TabPane tab="Rated" key="2">
              <MovieCardsList movies={ratedMovies}
                              error={error}
                              movieRating={movieRating}
                              onChangePage={this.onChangeRatedPage}
                              changeRating={this.changeRating}
                              currentPage={currentRatedPage}
                              totalResults={totalRatedResults}
                              showPagination
                              loading={loading} />
            </TabPane>
          </Tabs>
        </div>
      </ContextProvider>
    );
  };
}

export default App;
