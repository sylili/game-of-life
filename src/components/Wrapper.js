import { styled } from "styled-components";

export const Wrapper = styled.section`
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  margin: auto;
  display: grid;
  width: fit-content;
`;
