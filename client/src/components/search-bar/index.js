import { useState } from "react";

function SearchBar({ searchHandler }) {
  const [searchValue, setSearchValue] = useState('');
  
  return (
    <input 
      type="search" 
      placeholder="Search by title, author"
      className="h-11 w-full p-3 outline outline-1 outline-black placeholder-gray-500"
      value={searchValue}
      onChange={(event) => {
        setSearchValue(event.target.value);
        searchHandler(event.target.value);
      }}
    />
  );
}

export default SearchBar;
