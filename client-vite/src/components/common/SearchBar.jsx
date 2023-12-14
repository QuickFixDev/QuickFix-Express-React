// SearchBar.js
import React, { useState } from 'react';

const SearchBar = ({ onSearch, searchType }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <input
      type="text"
      className="form-control p-3"
      placeholder={`Search ${searchType}`}
      value={searchTerm}
      onChange={handleSearch}
      autoComplete="on"
    />
  );
};

export default SearchBar;
