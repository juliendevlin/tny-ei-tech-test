function DetailCard({ header, borderColor, detailLabels, detailValues }) {
  // Paired labels and values are at corresponding indices of their arrays
  const detailList = detailLabels.map((label, i) => {
    const uppercasedLabel = label.toUpperCase();
    const value = detailValues[i];

    return (
      <div key={label}>
        <h3 className="font-normal text-xs ">{uppercasedLabel}</h3>
        <h4 className="font-medium text-lg">{value}</h4>
      </div>
    );
  });

  return (
    // Cannot interpolate/concatenate partial class names together with Tailwind
    // Must exist as complete unbroken string literal
    <div className={`pl-2.5 border-l-2 ${borderColor === 'teal' ? 'border-teal-600' : 'border-pink-600'}`}>
      <h2 className="font-medium text-4xl mb-4">{header}</h2>

      <div className="flex gap-4 flex-col">
        {detailList}
      </div>
    </div>
  );
}

export default DetailCard;
