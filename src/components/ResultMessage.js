import { styled } from "styled-components";
import { getMessage } from "../helper";

const Container = styled.section`
  color: white;
  display: flex;
  justify-content: center;
  font-size: large;
  font-weight: 700;
  padding: 1.5em;
  background-color: #395b64;
`;

function ResultMessage({ boardData }) {
  return <Container>{getMessage(boardData.isRunning)}</Container>;
}

export default ResultMessage;
