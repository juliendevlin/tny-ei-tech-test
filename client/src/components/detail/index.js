import { useParams } from 'react-router-dom';
import DetailCard from '../detail-card';
import useFetchBook from "../../hooks/useFetchBook";

function Detail() {
  const { isbn } = useParams();
  const { book, isLoading, error } = useFetchBook(isbn);

  const header = book.title;
  const borderColor = book.type === 'fiction' ? 'teal' : 'pink';
  const detailLabels = ['author', 'publisher', 'city', 'format', 'year', 'isbn'];
  const detailValues = [book.author, book.publisher, book.city, book.format, book.year, book.isbn];

  return (
    <div className="mx-11">
      {
        isLoading
          ? <p>Loading!</p>
          : error
            ? <p>Error!</p>
            : (
              <DetailCard 
                header={header}
                borderColor={borderColor}
                detailLabels={detailLabels}
                detailValues={detailValues}
              />
            )
      }
    </div>
  );
}

export default Detail;
