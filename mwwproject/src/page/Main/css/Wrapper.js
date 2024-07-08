import styled from "styled-components";
const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh; /* Viewport height to ensure it covers at least the screen height */
  margin: 0;
  padding: 0;
  filter: ${(props) => (props.isLoggedIn ? "none" : "blur(10px)")};
  display: flex;
  flex-direction: column;
`;
export default Wrapper;
