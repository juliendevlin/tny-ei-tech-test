function SearchResultsItem({ header, leftSubheader, rightSubheader, borderColor }) {
  return (
    <div className={`py-1 border-t-2 border-${borderColor}-600`}>
      <h2 className="font-medium text-4xl">{header}</h2>
      <div className="flex justify-between">
        <h3 className="font-medium text-xs">{leftSubheader}</h3>
        <h3 className="font-medium text-xs">{rightSubheader}</h3>
      </div>
    </div>
  );
}

export default SearchResultsItem;