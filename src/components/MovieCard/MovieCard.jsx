import React from 'react';
import {Rate} from 'antd';
import PropTypes from 'prop-types';
import { format } from 'date-fns'

import {Context} from "../../constants/context";
import clipFunc from "../../utils/clipFunc";
import getFilmGenre from "../../utils/getFilmGanre";
import changeRatingColor from "../../utils/changeRatingColor";

import image from '../../assets/img/no-image.png';
import './movieCard.css';

const  MovieCard = ({movie, changeRating, movieRating}) => {

  const allGenres = React.useContext(Context);

  const {
    title,
    id,
    overview,
    release_date: date,
    poster_path: posterPath,
    vote_average: average,
    genre_ids: genreIds,
  } = movie;

  const genres = getFilmGenre(allGenres.genres, genreIds);
  const filmGenre = genres.map(genre => <span key={genre.id} className='genre'>{genre.name}</span>);
  const border = changeRatingColor(average);
  const poster = !posterPath ? image : `http://image.tmdb.org/t/p/w185${posterPath}`;

  return (
    <div className='card'>
      <img className='poster' src={poster} alt="card-img"/>
      <div className="card__wrapper">
        <div className='title__wrap'>
          <span className='title'>{title}</span>
          <span className='rating' style={border}>{average}</span>
        </div>
        <span className='date'>{format(date ? new Date(date) : new Date(), 'PPP')}</span>
        <div className="genre-items">
          {filmGenre}
        </div>
        <div className="descr">
          <p className='card-text'>{clipFunc(overview)}</p>
        </div>
        <Rate className='stars' onChange={(value) => {
          changeRating(id, value);
        }} value={movieRating[id]} count='10' allowHalf defaultValue={0}/>
      </div>
    </div>
  );
}

MovieCard.defaultProps = {
  changeRating: () => {},
  movieRating: {}
};

MovieCard.propTypes = {
  movie: PropTypes.objectOf(PropTypes.any).isRequired,
  movieRating: PropTypes.objectOf(PropTypes.any),
  changeRating: PropTypes.func,
};

export default MovieCard;