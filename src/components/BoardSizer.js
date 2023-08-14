import { useState } from "react";
import { Button } from "./Button";
import { styled } from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: stretch;
  max-width: 400px;
  margin: 0 auto;
`;

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
    if (rows > 30 || rows < 1 || columns > 30 || columns < 1) {
      alert("Please enter a valid number between 1-30!");
      return;
    } else boardSizeCallback(rows, columns);
  };
  return (
    <div>
      <p>
        You can set the table dimensions between 1-30 for each parameter.
        Default is 20x30.
      </p>
      <Form>
        <label>
          Rows:
          <br />
          <input type="number" value={rows} onChange={handleRowChange} />
          <br />
        </label>
        <label>
          Columns:
          <br />
          <input type="number" value={columns} onChange={handleColumnChange} />
        </label>
        <br />
        <Button secondary onClick={handleSubmit}>
          Set
        </Button>
      </Form>
    </div>
  );
}

export default BoardSizer;
