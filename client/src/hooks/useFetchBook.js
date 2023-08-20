import { useState, useEffect } from "react";

function useFetchBook(isbn) {
  const [book, setBook] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async (isbn) => {
      setIsLoading(true);
  
      try {
        const response = await fetch(`http://localhost:3001/books/${isbn}`);
        const data = await response.json();

        setIsLoading(false);
        if (response.ok) setBook(data);
        else setError(data.err)
      } catch(err) {
        setIsLoading(false);
        setError(err);
      }
    };

    fetchBook(isbn);
  }, [isbn]);

  return { book, isLoading, error };
}

export default useFetchBook;
