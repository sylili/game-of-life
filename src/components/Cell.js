function Cell({ mouseDown, alive, pos, setPosition }) {
  const handleClick = () => {
    setPosition(pos);
  };
  const handleMouseEnter = () => {
    if (mouseDown) {
      setPosition(pos);
    }
  };
  return (
    <div
      className={`cell ${alive && "active"}`}
      onMouseEnter={handleMouseEnter}
      onMouseDown={handleClick}
    ></div>
  );
}

export default Cell;
