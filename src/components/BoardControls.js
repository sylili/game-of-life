import { styled } from "styled-components";
import { Button } from "./Button";
import { IN_PROGRESS, OSCILLATOR, STOPPED, countAlive } from "../helper";
import { getNextState } from "../logic";

const StyledBoardControls = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
`;

function BoardControls({
  boardData,
  setBoardData,
  columns,
  defBoard,
  resetBoard,
}) {
  const handleNextClick = () => {
    setBoardData((prev) => {
      const nextBoard = getNextState(prev.board, columns);
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
      board: defBoard,
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
      <h4>Generation count: {boardData.generationCount}</h4>
      <h4>Size of population: {boardData.aliveCount}</h4>
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
        <Button onClick={handleClearBoard}>Clear board</Button>
        <Button onClick={handleResetBoard}>Reset board</Button>
      </div>
    </StyledBoardControls>
  );
}

export default BoardControls;
