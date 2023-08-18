import { useEffect, useState } from 'react';
import SearchBar from '../search-bar';
import SearchResults from '../search-results';
import useFetchBooks from '../../hooks/useFetchBooks';

function Search() {
  const { books, isLoading, error } = useFetchBooks();
  const [filteredBooks, setFilteredBooks] = useState(books);
  
  useEffect(() => {
    setFilteredBooks(books)
  }, [books]);

  const searchHandler = (searchValue) => {
    if (searchValue === '') setFilteredBooks(books);
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

  const results = filteredBooks
    .toSorted((a, b) => a.year - b.year)
    .map((book) => {
    return {
      id: book.isbn,
      header: book.title,
      leftSubheader: book.author,
      rightSubheader: book.year,
      borderColor: book.type === 'fiction' ? 'teal' : 'pink',
    }
  })

  return (
    <div className="mx-11">
      <div className="mb-12">
        <SearchBar searchHandler={searchHandler} />
      </div>

      {
        isLoading
          ? <p>Loading!</p>
          : error 
            ? <p>error!</p>
            : <SearchResults results={results} />
      } 
    </div>
  );
}

export default Search;
