import styled from "styled-components";
import { Link } from "react-router-dom";
const Button = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 45px;
  text-decoration: none;
  color: white;
  margin: 30px auto;
  border-radius: 5px;
  font-weight: 1000;
  background-color: #7f7f7f;
  border: 1px solid rgba(222, 222, 222, 0.2);
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 45px;
    text-decoration: none;
    color: white;
    margin: 30px auto;
    border-radius: 5px;
    font-weight: 1000;
    background-color: black;
    border: 1px solid rgba(222, 222, 222, 0.2);
    border-radius: 10px;
    cursor: pointer;
  }
`;
export default Button;
