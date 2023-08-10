import { styled } from "styled-components";

const StyledCell = styled.section`
  border: 1px solid #fcbf49;
  padding: 10px;
  background-color: ${(props) => props.alive && "#fcbf49"};
`;

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
    <div onMouseEnter={handleMouseEnter} onMouseDown={handleClick}>
      <StyledCell alive={alive} />
    </div>
  );
}

export default Cell;
