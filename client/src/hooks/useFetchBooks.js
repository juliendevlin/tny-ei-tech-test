import { useState, useEffect } from "react";

function useFetchBooks() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
  
      try {
        const response = await fetch('http://localhost:3001/books');
        const data = await response.json();

        setIsLoading(false);
        setBooks(data);
      } catch(err) {
        setIsLoading(false);
        setError(err);
      }
    };

    fetchBooks();
  }, []);

  return { books, isLoading, error };
}

export default useFetchBooks;
