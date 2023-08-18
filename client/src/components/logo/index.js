function Logo({ clickHandler }) {
  return (
    <h1 className="font-light text-4xl hover:cursor-pointer" onClick={clickHandler}>
      {'[books]'}
    </h1>
  );
}

export default Logo;
