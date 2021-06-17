import React from "react";
import {Input} from 'antd';

import PropTypes from 'prop-types';

import './searchInput.css';

function SearchInput({onChangeInput}) {
  return (
    <form>
      <Input className='search-input' onChange={onChangeInput} size='large' placeholder="Type to search"/>
    </form>
  );
}

SearchInput.defaultProps = {
  onChangeInput: () => {},
}

SearchInput.propTypes = {
  onChangeInput: PropTypes.func,
}

export default SearchInput;