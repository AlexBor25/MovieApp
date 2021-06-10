import React from "react";
import {Input} from 'antd';

import PropTypes from 'prop-types';

import './searchInput.css';

function SearchInput({onSubmit, onChangeInput}) {
  return (
    <form onSubmit={onSubmit}>
      <Input className='search-input' onChange={onChangeInput} size='large' placeholder="Type to search"/>
    </form>
  );
}

SearchInput.defaultValue = {
  onChangeInput: () => {},
  onSubmit: () => {}
}

SearchInput.propTypes = {
  onChangeInput: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default SearchInput;