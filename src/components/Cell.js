function Cell({ alive, pos, setPosition }) {
  const handleClick = () => {
    setPosition(pos);
  };
  return (
    <div className={`cell ${alive && "active"}`} onClick={handleClick}></div>
  );
}

export default Cell;
