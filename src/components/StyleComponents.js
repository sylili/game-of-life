import { styled } from "styled-components";

export const Container = styled.section`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  align-items: center;
  padding: 20px;
  color: white;
`;

export const H2 = styled.section`
  color: white;
  display: flex;
  justify-content: center;
  font-size: larger;
  font-weight: 700;
  padding: 1.5em;
`;

export const H4 = styled.section`
  color: white;
  display: flex;
  justify-content: center;
  font-size: medium;
  font-weight: bold;
  padding: 1.5em;
`;

export const Spacer2em = styled.section`
  padding: 2em;
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
  color: #f77f00;
  text-decoration: none;
`;
