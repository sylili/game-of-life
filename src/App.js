import { useState } from "react";
import "./App.css";
import Cell from "./components/Cell";
import { getNextStep } from "./logic";

const rows = 10;
const columns = 10;
const defBoard = new Array(rows * columns).fill(false);

function App() {
  const [board, setBoard] = useState(defBoard);

  const setPosition = (i) => {
    setBoard((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  const table = defBoard.map((cell, i) => {
    return <Cell alive={board[i]} key={i} pos={i} setPosition={setPosition} />;
  });

  const handleNextClick = () => {
    const nextState = getNextStep(board, columns);

    setBoard(() => {
      return nextState;
    });
  };

  const handlePlayClick = () => {};

  const handleStopClick = () => {};

  return (
    <div className="App">
      <div className="wrapper">{table}</div>
      <button onClick={handleNextClick}>Next</button>
      <button onClick={handlePlayClick}>Play</button>
      <button onClick={handleStopClick}>Stop</button>
    </div>
  );
}

export default App;
