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

const rows = 10;
const columns = 10;
const defBoard = new Array(rows * columns).fill(false);

function App() {
  const [board, setBoard] = useState(defBoard);
  const [animation, setAnimation] = useState(STOPPED);
  const [generationCount, setGenerationCount] = useState(0);
  const [aliveCount, setAliveCount] = useState(0);
  const [resetBoard, setResetBoard] = useState(defBoard);

  useEffect(() => {
    setAliveCount(() => countAlive(board));
  }, [board]);

  const setPosition = (i) => {
    setGenerationCount(() => 0);
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
    return <Cell alive={board[i]} key={i} pos={i} setPosition={setPosition} />;
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
    setAnimation(() => STOPPED);
    setBoard(() => defBoard);
    setGenerationCount(() => 0);
    setAliveCount(() => 0);
    setResetBoard(() => {
      return defBoard;
    });
  };

  const handleResetBoard = () => {
    setAnimation(() => STOPPED);
    setBoard(() => resetBoard);
    setGenerationCount(() => 0);
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
      <div className="board">
        <p>Welcome to The Game of Life!</p>
        <div>
          <p>Generation count: {generationCount}</p>
          <p>Size of population: {aliveCount}</p>
        </div>
        <div className="wrapper">{grid}</div>
      </div>
      <div className="buttons">
        <button onClick={handleNextClick}>Next</button>
        <button onClick={handlePlayClick}>Play/Stop</button>
        <button onClick={handleClearBoard}>Clear board</button>
        <button onClick={handleResetBoard}>Reset board</button>
      </div>
      <div className="resultMessage">{getMessage(animation)}</div>
    </div>
  );
}

export default App;
