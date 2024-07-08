import styled from "styled-components";
import { Link } from "react-router-dom";
const Button = styled(Link)`
  width: 100%;
  height: 50px;
  padding: 0px 10px;
  text-decoration: none;
  color: black;
  font-weight: 700;
  background-color: ${(props) => props?.bgColor};
  border: 1px solid ${(props) => props?.bdColor};
  border-radius: 5px;
  display: grid;
  grid-template-columns: 80px 270px;
  align-items: center;
  cursor: pointer;
`;

const ButtonText = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  color: ${(props) => props?.ftColor};
`;

export { Button, ButtonText };
