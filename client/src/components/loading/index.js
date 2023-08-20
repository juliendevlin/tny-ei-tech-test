function Loading() {
  return (
    <div className="h-12 flex justify-center">
      <div
        className="h-16 w-16 rounded-full border-8 border-slate-200 border-t-slate-500 animate-spin"
        data-testid="loading-wheel"
      >
      </div>
    </div>
  );
}

export default Loading;
