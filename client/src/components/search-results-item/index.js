function SearchResultsItem({ header, leftSubheader, rightSubheader, borderColor, clickHandler }) {
  return (
    <div 
      // Cannot interpolation/concatenate partial class names together with Tailwind
      // Must exist as complete unbroken string literal
      className={`py-1 border-t-2 ${borderColor === 'teal' ? 'border-teal-600' : 'border-pink-600'} hover:cursor-pointer`}
      onClick={clickHandler}
    >
      <h2 className="font-medium text-4xl">{header}</h2>
      <div className="flex justify-between">
        <h3 className="font-medium text-xs">{leftSubheader}</h3>
        <h3 className="font-medium text-xs">{rightSubheader}</h3>
      </div>
    </div>
  );
}

export default SearchResultsItem;