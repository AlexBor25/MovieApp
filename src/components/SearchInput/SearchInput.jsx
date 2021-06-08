import React from "react";
import { Input } from 'antd';

import './searchInput.css';

const SearchInput = () => (
  <Input className='search-input' size='large' placeholder="Type to search" />
);

export default SearchInput;