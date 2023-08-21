import { styled } from "styled-components";

export const Container = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  padding: 20px;
  color: white;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: center;
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
  color: #deff00;
  text-decoration: none;
`;
