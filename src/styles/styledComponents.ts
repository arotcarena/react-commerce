import styled from "styled-components";

export const Button = styled.button<{ $active?: boolean; }>`
  font-family: 'Montserrat', sans-serif;
  border: solid 1px black;
  border-radius: 5px;
  height: 45px;
  padding: 10px 25px;
  background-color: ${props => props.$active ? 'black': 'white'};
  color: ${props => props.$active ? 'white': 'black'};
  transition: all .3s;
  cursor: pointer;
`
