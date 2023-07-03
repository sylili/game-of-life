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
  getMessage,
  isBoardStagnates,
} from "../helper";

const rows = 10;
const columns = 10;
const defBoard = new Array(rows * columns).fill(false);

function App() {
  const [board, setBoard] = useState(defBoard);
  const [animation, setAnimation] = useState(STOPPED);

  const setPosition = (i) => {
    setBoard((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  const grid = defBoard.map((cell, i) => {
    return <Cell alive={board[i]} key={i} pos={i} setPosition={setPosition} />;
  });

  const handleNextClick = async () => {
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
  };

  useEffect(() => {
    if (animation === IN_PROGRESS || animation === OSCILLATOR) {
      const playAnimation = () =>
        setInterval(() => {
          setBoard((prev) => {
            let nextStep = getNextState(prev, columns);
            if (isBoardStagnates(prev, defBoard)) {
              setAnimation(() => EMPTY);
            } else if (isBoardStagnates(prev, nextStep)) {
              setAnimation(() => STILL_LIFE);
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
        <div className="wrapper">{grid}</div>
      </div>
      <div className="buttons">
        <button onClick={handleNextClick}>Next</button>
        <button onClick={handlePlayClick}>Play/Stop</button>
        <button onClick={handleClearBoard}>Clear board</button>
      </div>
      <div className="resultMessage">{getMessage(animation)}</div>
    </div>
  );
}

export default App;
