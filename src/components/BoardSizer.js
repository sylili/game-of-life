import { useState } from "react";
import { styled } from "styled-components";

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

function BoardSizer({ boardData, boardSizeCallback }) {
  const [rows, setRows] = useState(boardData.board.length / boardData.columns);
  const [columns, setColumns] = useState(boardData.columns);

  const handleRowChange = (event) => {
    setRows(event.target.value);
  };

  const handleColumnChange = (event) => {
    setColumns(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    boardSizeCallback(rows, columns);
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
            onMouseUp={handleSubmit}
            onTouchEnd={handleSubmit}
            onKeyUp={handleSubmit}
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
            onMouseUp={handleSubmit}
            onTouchEnd={handleSubmit}
            onKeyUp={handleSubmit}
            value={columns}
          ></input>
        </label>
      </Form>
    </StyledBoard>
  );
}

export default BoardSizer;
