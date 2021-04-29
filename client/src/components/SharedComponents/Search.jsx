import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch as farSearch } from '@fortawesome/free-solid-svg-icons';

const Search = () => {
  const [searchText, setSearchText] = useState('');
  const handleKeyDown = ({ key }) => {
    if (key === 'Enter') {
      setSearchText('');
    }
  };
  return (
    <div>
      <div className="nav-search">
        <input
          className="nav-search-field"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <FontAwesomeIcon icon={farSearch} color="#fff" />
      </div>
    </div>
  );
};

export default Search;
