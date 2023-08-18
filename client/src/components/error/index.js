function Error({ message} ) {
  return (
    <div className="w-full p-3 flex justify-center bg-red-100">
      <h2 className="text-lg font-medium text-red-500">{message}</h2>
    </div>
  );
}

export default Error;
