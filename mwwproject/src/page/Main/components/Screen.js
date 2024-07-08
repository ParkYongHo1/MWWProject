import Wrapper from "../css/Wrapper";
import Container from "../css/Container";
import Box from "../css/Box";
import FlexDiv from "../css/FlexDiv";
import P from "../css/P";
import Chart from "../../Charts/Chart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
const Screen = ({ isLoggedIn }) => {
  return (
    <>
      <Wrapper isLoggedIn={isLoggedIn}>
        <Container>
          <Box
            style={{
              background: "linear-gradient(to right, #ffbf96, #fe7096)",
            }}
          >
            <FlexDiv>
              <P size="middle">여성 발화 통계</P>
              <FontAwesomeIcon icon={faChartLine} color="white" size="lg" />
            </FlexDiv>
            <FlexDiv>
              <P size="large">85%</P>
            </FlexDiv>
          </Box>
          <Box
            style={{
              background: "linear-gradient(to right, #90caf9, #047edf 100%)",
            }}
          >
            <FlexDiv>
              <P size="middle">남성 발화 통계</P>
              <FontAwesomeIcon icon={faChartLine} color="white" size="lg" />
            </FlexDiv>
            <FlexDiv>
              <P size="large">85%</P>
            </FlexDiv>
          </Box>
          <Box
            style={{
              background: "linear-gradient(to right, #84d9d2, #07cdae 40%)",
            }}
          >
            <FlexDiv>
              <P size="middle">발화 히트 통계</P>
              <FontAwesomeIcon icon={faChartLine} color="white" size="lg" />
            </FlexDiv>
            <FlexDiv>
              <P size="large">85%</P>
            </FlexDiv>
          </Box>
        </Container>
        <Chart></Chart>
      </Wrapper>
    </>
  );
};
export default Screen;
