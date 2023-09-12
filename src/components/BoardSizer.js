import { useState } from "react";
import { styled } from "styled-components";
import { STOPPED } from "../utilities/helper";

const Form = styled.form`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-end;
  max-width: 400px;
  margin: 0 auto;
  align-content: center;
  color: white;
  padding: 1em;

  input[type="range"] {
    accent-color: #b1c144;
  }
`;

const StyledBoard = styled.section``;

function BoardSizer({ boardData, setResetBoard, setBoardData }) {
  const [rows, setRows] = useState(boardData.board.length / boardData.columns);
  const [columns, setColumns] = useState(boardData.columns);

  const handleRowChange = (event) => {
    setRows(+event.target.value);
  };

  const handleColumnChange = (event) => {
    setColumns(+event.target.value);
  };

  const submit = () => {
    const newBoard = new Array(rows * columns).fill(false);
    setResetBoard(newBoard);
    setBoardData((prev) => {
      return {
        ...prev,
        columns: columns,
        rows: rows,
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
    <StyledBoard>
      <Form>
        <label>
          Rows: {rows}
          <br />
          <input
            type="range"
            min="1"
            max="20"
            onChange={handleRowChange}
            onMouseUp={submit}
            onTouchEnd={submit}
            onKeyUp={submit}
            value={rows}
          />
          <br />
        </label>
        <label>
          Columns: {columns}
          <br />
          <input
            type="range"
            min="1"
            max="30"
            onChange={handleColumnChange}
            onMouseUp={submit}
            onTouchEnd={submit}
            onKeyUp={submit}
            value={columns}
          ></input>
        </label>
      </Form>
    </StyledBoard>
  );
}

export default BoardSizer;
