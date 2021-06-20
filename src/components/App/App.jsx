import React from "react";
import './App.css';
import {Tabs} from "antd";

import SearchInput from "../SearchInput/SearchInput";
import MovieCardsList from "../MovieCardsList/MovieCardsList";
import Api from "../../api/api";
import ContextProvider from "../../constants/context";
import storage from "../../utils/storage";

const { TabPane } = Tabs;
const {saveRating, getId, saveId, clearStorage} = storage();
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
    totalResults: 0,
    showPagination: true,
  };

  debounceFn = debounce(this.getData.bind(this), 1500);

  componentDidMount() {
    const {currentPage} = this.state;
    this.api.getPopularMovies(currentPage).then(data => {
      this.setState({
        searchMovies: [...data.results],
        loading: false,
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

  changeRating = (id, value) => {
    this.api.putRating(id, value);
    saveRating(id, value);
  };

  getRatedMovie = () => {
    this.api.getRatedMovies().then(data => {
      this.setState({
        ratedMovies: [...data.results],
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

  render() {
    const {searchMovies, loading, error, totalResults, currentPage, showPagination, ratedMovies} = this.state;

    return (
      <ContextProvider>
        <div className='container'>
          <Tabs className='tabs' defaultActiveKey="1" onChange={this.changeTabs}>
            <TabPane tab="Search" key="1">
              <SearchInput onChangeInput={this.onChangeInput} />
              <div className='cards'>
                <MovieCardsList movies={searchMovies}
                                loading={loading}
                                totalResults={totalResults}
                                currentPage={currentPage}
                                showPagination={showPagination}
                                changeRating={this.changeRating}
                                onChangePage={this.onChangePage}
                                error={error} />
              </div>
            </TabPane>
            <TabPane tab="Rated" key="2">
              <MovieCardsList movies={ratedMovies} />
            </TabPane>
          </Tabs>
        </div>
      </ContextProvider>
    );
  };
}

export default App;
