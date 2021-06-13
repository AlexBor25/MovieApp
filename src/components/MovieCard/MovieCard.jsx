import React from 'react';
import {Rate} from 'antd';
import PropTypes from 'prop-types';

import image from '../../assets/img/no-image.png';

import './movieCard.css';
import clipFunc from "../../utils/clipFunc";

const  MovieCard = ({movie}) => {

  const {
    title,
    overview,
    release_date: date,
    poster_path: posterPath,
    vote_average: average,
    // genre_ids: genreIds,
  } = movie;

  return (
    <div className='card'>
      <img className='poster' src={!posterPath ? image : `http://image.tmdb.org/t/p/w185${posterPath}`} alt="card-img"/>
      <div className='descr'>
        <div className='title__wrap'>
          <span className='title'>{title}</span>
          <span className='rating'>{average}</span>
        </div>
        <span className='date'>{date}</span>
        <span className='genre'>genre</span>
        <p className='card-descr'>{clipFunc(overview)}</p>
        <Rate className='stars' count='10' allowHalf defaultValue={2.5}/>
      </div>
    </div>
  );
}

MovieCard.defaultValue = {};

MovieCard.propTypes = {
  movie: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default MovieCard;