import { styled } from "styled-components";

const StyledCell = styled.section`
  border: 1px solid #a5c9ca30;
  padding: 0.65em;
  background-color: ${(props) => props.alive && "#A5C9CA"};
  @media (max-width: 768px) {
    padding: 1.2vw;
  }
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
    <div onPointerEnter={handleMouseEnter} onPointerDown={handleClick}>
      <StyledCell alive={alive} />
    </div>
  );
}

export default Cell;
