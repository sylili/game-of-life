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
import { Button } from "./Button";
import BoardSizer from "./BoardSizer";
import {
  A,
  Container,
  Description,
  H2,
  H4,
  Spacer1em,
} from "./StyleComponents";

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
  const [showDesc, setShowDesc] = useState(true);

  const onClick = () => setShowDesc(!showDesc);

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
    setResetBoard(new Array(rows * columns).fill(false));
    setBoardData((prev) => {
      const newBoard = new Array(rows * columns).fill(false);
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
      <H2>Welcome to The Game of Life!</H2>
      <Button secondary onClick={onClick}>
        {showDesc ? "Hide" : "Show"} description
      </Button>

      <div>
        {showDesc && (
          <Description>
            <p>
              <A href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">
                The Game of Life
              </A>
              , also known simply as Life, is a cellular automaton devised by
              the British mathematician John Horton Conway in 1970. The universe
              of the Game of Life is an infinite, two-dimensional orthogonal
              grid of square cells, each of which is in one of two possible
              states, live or dead (or populated and unpopulated, respectively).
              Every cell interacts with its eight neighbours, which are the
              cells that are horizontally, vertically, or diagonally adjacent.
              At each step in time, the following transitions occur:
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
                Any live cell with more than three live neighbours dies, as if
                by overpopulation.
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
        )}
        <Spacer1em />
      </div>

      <BoardControls
        boardData={boardData}
        setBoardData={setBoardData}
        resetBoard={resetBoard}
      />
      <Container>
        <div>
          <div>
            <H4>Generation count: {boardData.generationCount}</H4>
            <H4>Size of population: {boardData.aliveCount}</H4>
          </div>
          <Spacer1em />
          <Chart
            populationHistory={boardData.populationHistory}
            generationHistory={boardData.generationHistory}
          />
        </div>
        <div>
          <BoardSizer
            boardData={boardData}
            boardSizeCallback={boardSizeCallback}
          />
          <Grid
            boardData={boardData}
            setBoardData={setBoardData}
            setResetBoard={setResetBoard}
          />
          <ResultMessage boardData={boardData} />
        </div>
      </Container>
    </div>
  );
}

export default App;
