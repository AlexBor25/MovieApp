import React from 'react';
import { Rate } from 'antd';

import './movieCard.css';

import promo from '../../assets/img/promo.png';

const MovieCard = () => (
    <div className='card'>
      <div>
        <img src={promo} alt="card-img"/>
      </div>
      <div className='descr'>
        <div className='title__wrap'>
          <span className='title'>Lorem ipsum dolor.</span>
          <span className='rating'>6.5</span>
        </div>
        <span className='date'>March 5, 2020 </span>
        <span className='genre'>Action</span>
        <p className='card-descr'>A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul  and salvation by becoming the coach of a disparate ethnically mixed high ...</p>
        <Rate className='stars' count='10' allowHalf defaultValue={2.5} />
      </div>
    </div>
);

export default MovieCard;