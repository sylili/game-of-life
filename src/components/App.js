import { useEffect, useState } from "react";
import { getNextState } from "../logic";
import {
  EMPTY,
  IN_PROGRESS,
  OSCILLATOR,
  STILL_LIFE,
  STOPPED,
  countAlive,
  isBoardStagnates,
} from "../helper";

import BoardControls from "./BoardControls";
import Chart from "./Chart";
import Grid from "./Grid";
import ResultMessage from "./ResultMessage";
import { styled } from "styled-components";

const rows = 10;
const columns = 20;
const emptyBoard = new Array(rows * columns).fill(false);

const defBoardData = {
  board: emptyBoard,
  generationCount: 0,
  generationHistory: [],
  aliveCount: 0,
  populationHistory: [],
  boardHistory: new Set(),
  isRunning: STOPPED,
};

const Container = styled.section`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  align-items: center;
  padding: 20px;
  color: white;
`;

const H2 = styled.section`
  color: white;
  display: flex;
  justify-content: center;
  font-size: larger;
  font-weight: 700;
  padding: 1.5em;
`;

function App() {
  const [resetBoard, setResetBoard] = useState(emptyBoard);
  const [boardData, setBoardData] = useState(defBoardData);

  useEffect(() => {
    setBoardData((prev) => {
      return {
        ...prev,
        populationHistory: [...prev.populationHistory, prev.aliveCount],
        generationHistory: [...prev.generationHistory, prev.generationCount],
      };
    });
  }, [boardData.generationCount]);

  useEffect(() => {
    if (
      boardData.isRunning === IN_PROGRESS ||
      boardData.isRunning === OSCILLATOR
    ) {
      const playAnimation = () =>
        setInterval(() => {
          setBoardData((prev) => {
            prev.boardHistory.add(JSON.stringify(prev.board));
            const nextBoard = getNextState(prev.board, columns);
            if (prev.boardHistory.has(JSON.stringify(nextBoard))) {
              if (isBoardStagnates(prev.board, emptyBoard)) {
                return {
                  ...prev,
                  isRunning: EMPTY,
                };
              } else if (isBoardStagnates(prev.board, nextBoard)) {
                return {
                  ...prev,
                  isRunning: STILL_LIFE,
                };
              }
              return {
                ...prev,
                board: nextBoard,
                generationCount: prev.generationCount + 1,
                isRunning: OSCILLATOR,
                aliveCount: countAlive(nextBoard),
              };
            }
            return {
              ...prev,
              board: nextBoard,
              generationCount: prev.generationCount + 1,
              aliveCount: countAlive(nextBoard),
            };
          });
        }, 230);

      const timer = playAnimation();

      return () => {
        clearInterval(timer);
      };
    }
  }, [boardData.isRunning]);

  return (
    <div>
      <H2>Welcome to The Game of Life!</H2>
      <Container>
        <BoardControls
          boardData={boardData}
          setBoardData={setBoardData}
          columns={columns}
          defBoard={emptyBoard}
          resetBoard={resetBoard}
        />
        <Chart
          populationHistory={boardData.populationHistory}
          generationHistory={boardData.generationHistory}
        />
      </Container>
      <Grid
        boardData={boardData}
        setBoardData={setBoardData}
        columns={columns}
        defBoard={emptyBoard}
        setResetBoard={setResetBoard}
      />
      <ResultMessage boardData={boardData} />
    </div>
  );
}

export default App;
