import { styled } from "styled-components";
import { getMessage } from "../helper";

const Container = styled.section`
  color: white;
  display: flex;
  justify-content: center;
  font-size: medium;
  font-weight: 500;
  padding: 1em;
`;

function ResultMessage({ boardData }) {
  return <Container>{getMessage(boardData.isRunning)}</Container>;
}

export default ResultMessage;
