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

function App() {
  const [board, setBoard] = useState(defBoard);
  const [animation, setAnimation] = useState(STOPPED);
  const [generationCount, setGenerationCount] = useState(0);
  const [aliveCount, setAliveCount] = useState(0);
  const [resetBoard, setResetBoard] = useState(defBoard);
  const [mouseDown, setMouseDown] = useState(false);
  const [populationHistory, setPopulationHistory] = useState([]);
  const [generationHistory, setGenerationHistory] = useState([]);

  useEffect(() => {
    setPopulationHistory((prev) => {
      return [...prev, aliveCount];
    });
    setGenerationHistory((prev) => {
      return [...prev, generationCount];
    });
  }, [generationCount]);

  useEffect(() => {
    setAliveCount(() => countAlive(board));
  }, [board]);

  const setPosition = (i) => {
    setGenerationCount(0);
    setBoard((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      setResetBoard(() => {
        return next;
      });
      return next;
    });
  };

  const grid = defBoard.map((cell, i) => {
    return (
      <Cell
        mouseDown={mouseDown}
        alive={board[i]}
        key={i}
        pos={i}
        setPosition={setPosition}
      />
    );
  });

  const handleNextClick = () => {
    setGenerationCount((generationCount) => generationCount + 1);
    setBoard((prev) => {
      return getNextState(prev, columns);
    });
  };

  const handlePlayClick = () => {
    setAnimation((prev) =>
      prev === OSCILLATOR || prev === IN_PROGRESS ? STOPPED : IN_PROGRESS
    );
  };

  const handleClearBoard = () => {
    setAnimation(STOPPED);
    setBoard(defBoard);
    setGenerationCount(0);
    setAliveCount(0);
  };

  const handleResetBoard = () => {
    setAnimation(STOPPED);
    setBoard(resetBoard);
    setGenerationCount(0);
  };

  useEffect(() => {
    if (animation === IN_PROGRESS || animation === OSCILLATOR) {
      const playAnimation = () =>
        setInterval(() => {
          setGenerationCount((generationCount) => generationCount + 1);
          setBoard((prev) => {
            let nextStep = getNextState(prev, columns);
            if (isBoardStagnates(prev, defBoard)) {
              setAnimation(() => EMPTY);
              return prev;
            } else if (isBoardStagnates(prev, nextStep)) {
              setAnimation(() => STILL_LIFE);
              return prev;
            } else if (
              isBoardStagnates(prev, getNextState(nextStep, columns))
            ) {
              setAnimation(() => OSCILLATOR);
            }
            return getNextState(prev, columns);
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
          <h4>Generation count: {generationCount}</h4>
          <h4>Size of population: {aliveCount}</h4>
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
            populationHistory={populationHistory}
            generationHistory={generationHistory}
          />
        }
      </ChartWrapper>
    </div>
  );
}

export default App;
