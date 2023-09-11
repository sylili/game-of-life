import { styled } from "styled-components";
import {
  IN_PROGRESS,
  OSCILLATOR,
  STOPPED,
  countAlive,
} from "../utilities/helper";
import { getNextState } from "../utilities/logic";
import { Button } from "../styled/StyleComponents";

const StyledBoardControls = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
`;

function BoardControls({ boardData, setBoardData, resetBoard }) {
  const handleNextClick = () => {
    setBoardData((prev) => {
      const nextBoard = getNextState(prev.board, prev.columns);
      return {
        ...prev,
        generationCount: prev.generationCount + 1,
        board: nextBoard,
        aliveCount: countAlive(nextBoard),
      };
    });
  };

  const handlePlayClick = () => {
    setBoardData((prev) => {
      if (prev.isRunning === OSCILLATOR || prev.isRunning === IN_PROGRESS) {
        return {
          ...prev,
          isRunning: STOPPED,
        };
      } else {
        return {
          ...prev,
          isRunning: IN_PROGRESS,
        };
      }
    });
  };

  const handleClearBoard = () => {
    setBoardData({
      ...boardData,
      board: new Array(boardData.board.length).fill(false),
      generationCount: 0,
      aliveCount: 0,
      generationHistory: [],
      populationHistory: [],
      boardHistory: new Set(),
      isRunning: STOPPED,
    });
  };

  const handleResetBoard = () => {
    setBoardData({
      ...boardData,
      board: resetBoard,
      aliveCount: countAlive(resetBoard),
      generationCount: 0,
      generationHistory: [],
      populationHistory: [],
      boardHistory: new Set(),
      isRunning: STOPPED,
    });
  };

  return (
    <StyledBoardControls>
      <div className="buttons">
        <Button primary onClick={handleNextClick}>
          Next
        </Button>
        <Button primary onClick={handlePlayClick}>
          {boardData.isRunning === OSCILLATOR ||
          boardData.isRunning === IN_PROGRESS
            ? "Stop"
            : "Play"}
        </Button>
        <Button onClick={handleClearBoard}>Clear</Button>
        <Button onClick={handleResetBoard}>Reset</Button>
      </div>
    </StyledBoardControls>
  );
}

export default BoardControls;
