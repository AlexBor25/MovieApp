import React from "react";
import './App.css';
import {Space} from "antd";
import SearchInput from "../SearchInput/SearchInput";
import Filter from "../Filter/Filter";
import MovieCardsList from "../MovieCardsList/MovieCardsList";
import PaginationItem from "../PaginationItem/PaginationItem";

function App() {
  return (
    <div className='container'>
      <Filter />
      <SearchInput />
      <div className='cards'>
        <Space>
          <MovieCardsList />
        </Space>
      </div>
      <div className='pag'>
        <PaginationItem />
      </div>
    </div>
  );
}

export default App;
