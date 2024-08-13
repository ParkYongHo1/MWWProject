import Wrapper from "../css/Wrapper";
import Container from "../css/Container";
import Box from "../css/Box";
import FlexDiv from "../css/FlexDiv";
import P from "../css/P";
import Chart from "../../Charts/Chart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";

const Screen = ({ isLoggedIn }) => {
  // Define state variables to hold API data
  const [abnormalSpeech, setAbnormalSpeech] = useState(0);
  const [correctAddressChanges, setCorrectAddressChanges] = useState(0);
  const [incorrectAddressChanges, setIncorrectAddressChanges] = useState(0);
  const [totalData, setTotalData] = useState({
    totalAbnormalSpeech: 0,
    totalCorrectAddressChanges: 0,
    totalIncorrectAddressChanges: 0,
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/user")
      .then((res) => {
        console.log(res.data); // Log the data to ensure it is correct

        const data = res.data;
        if (Array.isArray(data)) {
          const totalAbnormalSpeech = data.reduce(
            (sum, record) => sum + record.abnormal_speech,
            0
          );
          const totalCorrectAddressChanges = data.reduce(
            (sum, record) => sum + record.correct_address_changes,
            0
          );
          const totalIncorrectAddressChanges = data.reduce(
            (sum, record) => sum + record.incorrect_address_changes,
            0
          );

          // Update state with total values
          setTotalData({
            totalAbnormalSpeech,
            totalCorrectAddressChanges,
            totalIncorrectAddressChanges,
          });
          // Assuming data[0] exists and has the needed properties
          setAbnormalSpeech(data[0].abnormal_speech || 0);
          setCorrectAddressChanges(data[0].correct_address_changes || 0);
          setIncorrectAddressChanges(data[0].incorrect_address_changes || 0);
        } else {
          console.error("Data is not an array");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Runs once on component mount

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
              <P size="middle">주소 변경 ⭕</P>
              <FontAwesomeIcon icon={faChartLine} color="white" size="lg" />
            </FlexDiv>
            <FlexDiv>
              <P size="large">{totalData.totalCorrectAddressChanges}</P>
            </FlexDiv>
          </Box>
          <Box
            style={{
              background: "linear-gradient(to right, #90caf9, #047edf 100%)",
            }}
          >
            <FlexDiv>
              <P size="middle">주소 변경 ❌</P>
              <FontAwesomeIcon icon={faChartLine} color="white" size="lg" />
            </FlexDiv>
            <FlexDiv>
              <P size="large">{totalData.totalIncorrectAddressChanges}</P>
            </FlexDiv>
          </Box>
          <Box
            style={{
              background: "linear-gradient(to right, #84d9d2, #07cdae 40%)",
            }}
          >
            <FlexDiv>
              <P size="middle">비정상 발화</P>
              <FontAwesomeIcon icon={faChartLine} color="white" size="lg" />
            </FlexDiv>
            <FlexDiv>
              <P size="large">{totalData.totalAbnormalSpeech}</P>
            </FlexDiv>
          </Box>
        </Container>
        <Chart></Chart>
      </Wrapper>
    </>
  );
};

export default Screen;
