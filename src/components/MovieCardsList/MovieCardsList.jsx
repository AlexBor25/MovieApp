import React from 'react';
import {Alert, Pagination} from "antd";
import PropTypes from 'prop-types';

import MovieCard from "../MovieCard/MovieCard";
import Loader from "../Loader/Loader";

import './movieCardsList.css';

const MovieCardsList = ({movies, movieRating, showPagination, loading, error, currentPage, totalResults, onChangePage, changeRating}) => {

  const errorMsg = error ? <Alert type="error" message="Не удалось загрузить список фильмов!" banner /> : null;
  const moviesItems =  movies.map(movie => (<MovieCard key={movie.id}
                                                       movieRating={movieRating}
                                                       changeRating={changeRating}
                                                       movie={movie} />));

  if(loading) {
    return <Loader />;
  }

  if(error) {
    return errorMsg;
  }

  if(movies.length === 0) {
    return <Alert message="Не удалось найти указанный фильм!" banner closable/>;
  }

  return (
    <>
      <div className='movie-items'>
        {moviesItems}
      </div>
      <div className='pag'>
        { totalResults > 20 && showPagination
          ? <Pagination defaultCurrent={1}
                        current={currentPage}
                        pageSize={20}
                        onChange={onChangePage}
                        total={totalResults}/>
          : null
        }
      </div>
    </>
  );
};

MovieCardsList.defaultProps = {
  movies: [],
  movieRating: {},
  loading: false,
  error: false,
  currentPage: 1,
  totalResults: 0,
  onChangePage: () => {},
  changeRating: () => {},
  showPagination: true,
};

MovieCardsList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  movieRating: PropTypes.objectOf(PropTypes.any),
  error: PropTypes.bool,
  showPagination: PropTypes.bool,
  currentPage: PropTypes.number,
  totalResults: PropTypes.number,
  onChangePage: PropTypes.func,
  changeRating: PropTypes.func,
};

export default MovieCardsList;