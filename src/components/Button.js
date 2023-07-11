import { styled } from "styled-components";

export const Button = styled.button`
  background: ${(props) => (props.primary ? "#f77f00" : "#d62828")};
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 0px;
  border-radius: 3px;
`;
