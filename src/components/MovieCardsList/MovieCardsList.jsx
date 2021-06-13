import React from 'react';
import {Space} from "antd";

import PropTypes from 'prop-types';

import MovieCard from "../MovieCard/MovieCard";

import './movieCardsList.css';

const MovieCardsList = ({movies}) => (
  <Space align='center' wrap size={40}>
    { movies.map(movie => (<MovieCard key={movie.id} movie={movie} />)) }
  </Space>
);

MovieCardsList.defaultValue = {
    movies: []
};

MovieCardsList.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default MovieCardsList;