import Popup from "reactjs-popup";
import { A, Description } from "./StyleComponents";
import { styled } from "styled-components";
import { BsFillQuestionSquareFill } from "react-icons/bs";

const StyledPop = styled(Popup)`
  @keyframes anvil {
    0% {
      transform: scale(1) translateY(0px);
      opacity: 0;
    }
    5% {
      transform: scale(0.76) translateY(10px);
      opacity: 0.5;
    }
    100% {
      transform: scale(1) translateY(0px);
      opacity: 1;
    }
  }
  &-content {
    -webkit-animation: anvil 0.3s forwards;
  }
  &-overlay {
    background-color: #002c33e8;
  }
`;

const StyledIcon = styled(BsFillQuestionSquareFill)`
  color: white;
  height: 1.5em;
  width: 1.5em;
  padding: 5px;
`;

function PopupDesc() {
  return (
    <div style={{ float: "right" }}>
      <StyledPop modal trigger={<StyledIcon />} nested>
        <Description>
          <p>
            <A href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">
              The Game of Life
            </A>
            , also known simply as Life, is a cellular automaton devised by the
            British mathematician John Horton Conway in 1970. The universe of
            the Game of Life is an infinite, two-dimensional orthogonal grid of
            square cells, each of which is in one of two possible states, live
            or dead (or populated and unpopulated, respectively). Every cell
            interacts with its eight neighbours, which are the cells that are
            horizontally, vertically, or diagonally adjacent. At each step in
            time, the following transitions occur:
          </p>
          <ol>
            <li>
              Any live cell with fewer than two live neighbours dies, as if by
              underpopulation.
            </li>
            <li>
              Any live cell with two or three live neighbours lives on to the
              next generation.
            </li>
            <li>
              Any live cell with more than three live neighbours dies, as if by
              overpopulation.
            </li>
            <li>
              Any dead cell with exactly three live neighbours becomes a live
              cell, as if by reproduction.
            </li>
          </ol>
          <A href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">
            (source of description)
          </A>
        </Description>
      </StyledPop>
    </div>
  );
}

export default PopupDesc;
