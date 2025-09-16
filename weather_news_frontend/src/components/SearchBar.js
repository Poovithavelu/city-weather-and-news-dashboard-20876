import React, { useState } from 'react';

/**
 * SearchBar component allows user to enter a city and trigger a search.
 * Props:
 * - onSearch: function(cityString)
 * - placeholder: string
 * - defaultValue: string
 */
const SearchBar = ({ onSearch, placeholder = 'Search city', defaultValue = '' }) => {
  const [value, setValue] = useState(defaultValue || '');

  const submit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(value);
  };

  return (
    <form className="search card" onSubmit={submit} aria-label="Search City">
      <input
        type="text"
        aria-label="City"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoComplete="off"
        spellCheck="false"
      />
      <button className="btn" type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
