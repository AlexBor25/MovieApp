import React from 'react';
import {Space} from "antd";

import MovieCard from "../MovieCard/MovieCard";

import './movieCardsList.css';

const MovieCardsList = () => (
  <Space align='center' wrap size={40}>
    <MovieCard />
    <MovieCard />
    <MovieCard />
    <MovieCard />
    <MovieCard />
    <MovieCard />
  </Space>
);

export default MovieCardsList;