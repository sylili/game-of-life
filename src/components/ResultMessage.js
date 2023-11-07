import { styled } from "styled-components";
import { getMessage } from "../utilities/helper";

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
  return (
    <Container data-testid="result-message">
      {getMessage(boardData.isRunning)}
    </Container>
  );
}

export default ResultMessage;
