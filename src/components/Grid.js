import { styled } from "styled-components";
import Cell from "./Cell";
import { countAlive } from "../helper";
import { useState } from "react";

export const Wrapper = styled.section`
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  margin: 0 auto;
  display: grid;
  width: fit-content;
  padding: 10px;
  user-select: none;
`;

function Grid({ boardData, setBoardData, setResetBoard }) {
  const [mouseDown, setMouseDown] = useState(false);

  const setPosition = (i) => {
    setBoardData((prev) => {
      const nextBoard = [...prev.board];
      nextBoard[i] = !nextBoard[i];
      setResetBoard(nextBoard);

      return {
        ...prev,
        board: nextBoard,
        generationCount: 0,
        aliveCount: countAlive(nextBoard),
        boardHistory: new Set(),
      };
    });
  };

  const grid = boardData.board.map((cell, i) => {
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
  return (
    <Wrapper
      columns={boardData.columns}
      onPointerDown={() => {
        setMouseDown(true);
      }}
      onPointerUp={() => {
        setMouseDown(false);
      }}
      onPointerLeave={() => {
        setMouseDown(false);
      }}
    >
      {grid}
    </Wrapper>
  );
}

export default Grid;
