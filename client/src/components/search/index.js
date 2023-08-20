import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../search-bar';
import SearchResults from '../search-results';
import Error from '../error';
import Loading from '../loading';
import useFetchBooks from '../../hooks/useFetchBooks';

function Search() {
  const navigate = useNavigate();

  // Fetches all books from API
  const { books, isLoading, error } = useFetchBooks();

  // State to contain books to displa based on user search
  const [filteredBooks, setFilteredBooks] = useState(books);

  // Set value of filtered books when API responds
  useEffect(() => {
    setFilteredBooks(books);
  }, [books]);

  const searchHandler = (searchValue) => {
    // Display all books if there is no search input
    if (searchValue === '') setFilteredBooks(books);
    // Otherwise standardize search string to lowercase and find title/author matches
    else {
      const lowercasedSearchValue = searchValue.toLowerCase();
      
      const newFilteredBooks = books.filter((book) => {
        const lowercasedBookTitle = book.title.toLowerCase();
        const lowercasedBookAuthor = book.author.toLowerCase();

        const titleMatch = lowercasedBookTitle.includes(lowercasedSearchValue);
        const authorMatch = lowercasedBookAuthor.includes(lowercasedSearchValue);

        return titleMatch || authorMatch;
      });

      setFilteredBooks(newFilteredBooks);
    }
  };

  // Assign a copy of filteredBooks to results to pass down
  // Can then be sorted in place and mapped to the expected data structure for the SearchResults component
  const results = [...filteredBooks]
    .sort((a, b) => a.year - b.year)
    .map((book) => {
    return {
      id: book.isbn,
      header: book.title,
      leftSubheader: book.author,
      rightSubheader: book.year,
      borderColor: book.type === 'fiction' ? 'teal' : 'pink',
      clickHandler: () => navigate(`/books/${book.isbn}`)
    }
  })
  
  return (
    <div className="mx-11">
      <div className="mb-12">
        <SearchBar searchHandler={searchHandler} />
      </div>

      {
        isLoading === true
          ? <Loading />
          : error !== null
            ? <Error message={`Failed to load books - ${error}`}/>
            : <SearchResults results={results} />
      } 
    </div>
  );
}

export default Search;
