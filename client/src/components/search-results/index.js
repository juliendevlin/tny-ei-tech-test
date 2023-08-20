import SearchResultsItem from '../search-results-item';

function SearchResults({ results }) {
  const resultsList = results.map((result) => {
    return (
      <SearchResultsItem 
        key={result.id}
        header={result.header}
        leftSubheader={result.leftSubheader}
        rightSubheader={result.rightSubheader}
        borderColor={result.borderColor}
        clickHandler={result.clickHandler}
      />
    );
  });

  return (
    <div className="flex flex-col gap-6">
      {resultsList}
    </div>
  );
}

export default SearchResults;
