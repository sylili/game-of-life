import { useEffect, useState } from "react";
import Cell from "./Cell";
import { getNextState } from "../logic";
import {
  EMPTY,
  IN_PROGRESS,
  OSCILLATOR,
  STILL_LIFE,
  STOPPED,
  countAlive,
  getMessage,
  isBoardStagnates,
} from "../helper";

import { Wrapper } from "./Wrapper";
import BoardControls from "./BoardControls";
import { Board } from "./Board";
import Chart from "./Chart";

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

function App() {
  const [resetBoard, setResetBoard] = useState(emptyBoard);
  const [mouseDown, setMouseDown] = useState(false);
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

  const setPosition = (i) => {
    setBoardData((prev) => {
      const nextBoard = [...prev.board];
      nextBoard[i] = !nextBoard[i];
      setResetBoard(() => {
        return nextBoard;
      });

      return {
        ...prev,
        board: nextBoard,
        generationCount: 0,
        aliveCount: countAlive(nextBoard),
        boardHistory: new Set(),
      };
    });
  };

  const grid = emptyBoard.map((cell, i) => {
    return (
      <Cell
        mouseDown={mouseDown}
        alive={boardData.board[i]}
        key={i}
        pos={i}
        setPosition={setPosition}
      />
    );
  });

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
                isRunning: OSCILLATOR,
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
    <div className="App">
      <Board>
        <BoardControls
          boardData={boardData}
          setBoardData={setBoardData}
          columns={columns}
          defBoard={emptyBoard}
          resetBoard={resetBoard}
        />
        <div>
          <Wrapper
            columns={columns}
            onMouseDown={() => {
              setMouseDown(true);
            }}
            onMouseUp={() => {
              setMouseDown(false);
            }}
            onMouseLeave={() => {
              setMouseDown(false);
            }}
          >
            {grid}
          </Wrapper>
          <div className="resultMessage">{getMessage(boardData.isRunning)}</div>
        </div>
      </Board>
      <Chart
        populationHistory={boardData.populationHistory}
        generationHistory={boardData.generationHistory}
      />
    </div>
  );
}

export default App;
