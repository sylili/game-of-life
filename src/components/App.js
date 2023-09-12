import { useEffect, useState } from "react";
import { getNextState } from "../utilities/logic";
import {
  EMPTY,
  IN_PROGRESS,
  OSCILLATOR,
  STILL_LIFE,
  STOPPED,
  countAlive,
  isBoardStagnates,
} from "../utilities/helper";
import BoardControls from "./BoardControls";
import Chart from "./Chart";
import Grid from "./Grid";
import ResultMessage from "./ResultMessage";
import BoardSizer from "./BoardSizer";
import {
  Container,
  FlexGrow0,
  FlexGrow1,
  H2,
  H4,
  Spacer1em,
} from "../styled/StyleComponents";
import PopupDesc from "./PopupDesc";

const rows = 20;
const columns = 30;
const emptyBoard = new Array(rows * columns).fill(false);

const defBoardData = {
  board: emptyBoard,
  columns: columns,
  rows: rows,
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
                  populationHistory: [
                    ...prev.populationHistory,
                    prev.aliveCount,
                  ],
                  generationHistory: [
                    ...prev.generationHistory,
                    prev.generationCount,
                  ],
                };
              } else if (isBoardStagnates(prev.board, nextBoard)) {
                return {
                  ...prev,
                  isRunning: STILL_LIFE,
                  populationHistory: [
                    ...prev.populationHistory,
                    prev.aliveCount,
                  ],
                  generationHistory: [
                    ...prev.generationHistory,
                    prev.generationCount,
                  ],
                };
              }
              return {
                ...prev,
                board: nextBoard,
                generationCount: prev.generationCount + 1,
                isRunning: OSCILLATOR,
                aliveCount: countAlive(nextBoard),
                populationHistory: [...prev.populationHistory, prev.aliveCount],
                generationHistory: [
                  ...prev.generationHistory,
                  prev.generationCount,
                ],
              };
            }
            return {
              ...prev,
              board: nextBoard,
              generationCount: prev.generationCount + 1,
              aliveCount: countAlive(nextBoard),
              populationHistory: [...prev.populationHistory, prev.aliveCount],
              generationHistory: [
                ...prev.generationHistory,
                prev.generationCount,
              ],
            };
          });
        }, 230);

      const timer = playAnimation();

      return () => {
        clearInterval(timer);
      };
    }
  }, [
    boardData.isRunning,
    boardData.columns,
    boardData.rows,
    boardData.generationCount,
  ]);

  return (
    <div>
      <div>
        <PopupDesc />
      </div>
      <H2>Welcome to The Game of Life!</H2>
      <ResultMessage boardData={boardData} />
      <Container>
        <FlexGrow1>
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
        </FlexGrow1>
        <FlexGrow0>
          <BoardSizer
            boardData={boardData}
            setResetBoard={setResetBoard}
            setBoardData={setBoardData}
          />
          <H4>Generation count: {boardData.generationCount}</H4>
          <H4>Size of population: {boardData.aliveCount}</H4>
          <Spacer1em />
          <Chart
            populationHistory={boardData.populationHistory}
            generationHistory={boardData.generationHistory}
          />
        </FlexGrow0>
      </Container>
    </div>
  );
}

export default App;
