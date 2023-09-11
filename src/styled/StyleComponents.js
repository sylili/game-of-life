import { styled } from "styled-components";

export const Button = styled.button`
  cursor: pointer;
  background: ${(props) =>
    props.primary ? "#395B64" : props.secondary ? "#grey" : "#914949"};
  color: white;
  font-size: 1em;
  padding: 0.25em 1em;
  border: 0px;
  border-radius: 3px;
  display: ${(props) => props.secondary && "flex"};
  margin: ${(props) => (props.secondary ? "0 auto" : "0.7em")};
  align-items: center;
`;

export const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  align-content: flex-start;
`;

export const H2 = styled.h2`
  color: white;
  display: flex;
  justify-content: center;
  font-weight: 700;
  padding: 1em 0em 1em 1em;
  margin: 0px;
`;

export const H4 = styled.h4`
  color: white;
  display: flex;
  justify-content: center;
  font-size: medium;
  font-weight: 400;
`;

export const Spacer1em = styled.section`
  padding: 1em;
`;

export const Description = styled.section`
  display: flex;
  justify-content: center;
  max-width: 800px;
  margin: 0 auto;
  color: white;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  align-items: center;
  padding: 1em;
`;

export const A = styled.a`
  color: #deff00;
  text-decoration: none;
`;

export const FlexGrow0 = styled.section`
  flex-grow: 0;
  margin: 15px 0px;
`;

export const FlexGrow1 = styled.section`
  flex-grow: 1;
`;
