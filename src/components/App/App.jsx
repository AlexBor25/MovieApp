import React from "react";
import './App.css';
import {Pagination} from "antd";
import SearchInput from "../SearchInput/SearchInput";
import Filter from "../Filter/Filter";
import MovieCardsList from "../MovieCardsList/MovieCardsList";
import key from "../../constants/key";

class App extends React.Component {

  state = {
    movies: [],
    searchField: ''
  }

  onChangeInput = (event) => {
    this.setState({
      searchField: event.target.value
    })
  };

  onSubmit = (event) => {
    event.preventDefault();
    const {searchField} = this.state;
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&page=1&include_adult=false&query=${searchField}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          movies: [...data.results]
        });
      });
  };

  render() {

    const {movies} = this.state;

    return (
      <div className='container'>
        <Filter/>
        <SearchInput onSubmit={this.onSubmit}
                     onChangeInput={this.onChangeInput} />
        <div className='cards'>
          <MovieCardsList movies={movies}/>
        </div>
        <div className='pag'>
          <Pagination defaultCurrent={1} total={50}/>
        </div>
      </div>
    );
  }
}

export default App;
