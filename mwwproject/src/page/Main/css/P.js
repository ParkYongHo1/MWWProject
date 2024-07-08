import styled from "styled-components";
const P = styled.p`
  font-size: ${(props) => {
    switch (props.size) {
      case "small":
        return "15px";
      case "middle":
        return "18px";
      case "large":
        return "25px";
      default:
        return "15px";
    }
  }};
  font-weight: 700;
  color: white;
`;
export default P;
