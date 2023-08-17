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
import BoardSizer from "./BoardSizer";
import { Container, H2, H4, Spacer1em } from "./StyleComponents";
import PopupDesc from "./PopupDesc";
import { styled } from "styled-components";

const Container2 = styled.section`
  max-width: 400px;
`;

const rows = 20;
const columns = 30;
const emptyBoard = new Array(rows * columns).fill(false);

const defBoardData = {
  board: emptyBoard,
  columns: columns,
  generationCount: 0,
  generationHistory: [],
  aliveCount: 0,
  populationHistory: [],
  boardHistory: new Set(),
  isRunning: STOPPED,
};

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
            const nextBoard = getNextState(prev.board, boardData.columns);
            if (prev.boardHistory.has(JSON.stringify(nextBoard))) {
              if (
                isBoardStagnates(
                  prev.board,
                  new Array(prev.board.length).fill(false)
                )
              ) {
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
  }, [boardData.isRunning, boardData.columns]);

  const boardSizeCallback = (rows, columns) => {
    const newBoard = new Array(rows * columns).fill(false);
    setResetBoard(newBoard);
    setBoardData((prev) => {
      return {
        ...prev,
        columns: columns,
        board: newBoard,
        generationCount: 0,
        aliveCount: 0,
        generationHistory: [],
        populationHistory: [],
        boardHistory: new Set(),
        isRunning: STOPPED,
      };
    });
  };

  return (
    <div>
      <div>
        <PopupDesc />
      </div>
      <H2>Welcome to The Game of Life!</H2>

      <ResultMessage boardData={boardData} />

      <Container>
        <div>
          <Grid
            boardData={boardData}
            setBoardData={setBoardData}
            setResetBoard={setResetBoard}
          />
          <BoardControls
            boardData={boardData}
            setBoardData={setBoardData}
            resetBoard={resetBoard}
          />
        </div>
        <Container2>
          <BoardSizer
            boardData={boardData}
            boardSizeCallback={boardSizeCallback}
          />
          <H4>Generation count: {boardData.generationCount}</H4>
          <H4>Size of population: {boardData.aliveCount}</H4>
          <Spacer1em />
          <Chart
            populationHistory={boardData.populationHistory}
            generationHistory={boardData.generationHistory}
          />
        </Container2>
      </Container>
    </div>
  );
}

export default App;
