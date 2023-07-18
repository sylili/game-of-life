import { useEffect, useState } from "react";
import "../App.css";
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

import { Button } from "./Button";
import { Wrapper } from "./Wrapper";
import { BoardControls } from "./BoardControls";
import { Board } from "./Board";
import Chart, { ChartWrapper } from "./Chart";

const rows = 10;
const columns = 20;
const defBoard = new Array(rows * columns).fill(false);
const defBoardData = {
  board: defBoard,
  generationCount: 0,
  generationHistory: [],
  aliveCount: 0,
  populationHistory: [],
  boardHistory: new Set(),
};

function App() {
  const [animation, setAnimation] = useState(STOPPED);
  const [resetBoard, setResetBoard] = useState(defBoard);
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

  const grid = defBoard.map((cell, i) => {
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
    setAnimation((prev) =>
      prev === OSCILLATOR || prev === IN_PROGRESS ? STOPPED : IN_PROGRESS
    );
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
    });
    setAnimation(STOPPED);
  };

  const handleResetBoard = () => {
    setAnimation(STOPPED);

    setBoardData({
      ...boardData,
      board: resetBoard,
      aliveCount: countAlive(resetBoard),
      generationCount: 0,
      generationHistory: [],
      populationHistory: [],
      boardHistory: new Set(),
    });
  };

  useEffect(() => {
    if (animation === IN_PROGRESS || animation === OSCILLATOR) {
      const playAnimation = () =>
        setInterval(() => {
          setBoardData((prev) => {
            prev.boardHistory.add(JSON.stringify(prev.board));
            const nextBoard = getNextState(prev.board, columns);
            if (prev.boardHistory.has(JSON.stringify(nextBoard))) {
              if (isBoardStagnates(prev.board, defBoard)) {
                setAnimation(() => EMPTY);
                return prev;
              } else if (isBoardStagnates(prev.board, nextBoard)) {
                setAnimation(() => STILL_LIFE);
                return prev;
              }
              setAnimation(() => OSCILLATOR);
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
  }, [animation]);

  return (
    <div className="App">
      <Board>
        <BoardControls>
          <h2>Welcome to The Game of Life!</h2>
          <h4>Generation count: {boardData.generationCount}</h4>
          <h4>Size of population: {boardData.aliveCount}</h4>
          <div className="buttons">
            <Button primary onClick={handleNextClick}>
              Next
            </Button>
            <Button primary onClick={handlePlayClick}>
              {animation === OSCILLATOR || animation === IN_PROGRESS
                ? "Stop"
                : "Play"}
            </Button>
            <Button onClick={handleClearBoard}>Clear board</Button>
            <Button onClick={handleResetBoard}>Reset board</Button>
          </div>
        </BoardControls>
        <div className="board">
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
          <div className="resultMessage">{getMessage(animation)}</div>
        </div>
      </Board>
      <ChartWrapper>
        {
          <Chart
            populationHistory={boardData.populationHistory}
            generationHistory={boardData.generationHistory}
          />
        }
      </ChartWrapper>
    </div>
  );
}

export default App;
