import { styled } from "styled-components";

export const Button = styled.button`
  cursor: pointer;
  background: ${(props) =>
    props.primary ? "#f77f00" : props.secondary ? "grey" : "#d62828"};
  color: white;
  font-size: 1em;
  padding: 0.25em 1em;
  border: 0px;
  border-radius: 3px;
  display: ${(props) => props.secondary && "flex"};
  margin: ${(props) => (props.secondary ? "0 auto" : "1em")};
  align-items: center;
`;
