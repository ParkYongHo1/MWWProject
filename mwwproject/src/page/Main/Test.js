import React, { useEffect, useState } from "react";
import Wrapper from "./css/Wrapper";
import Container from "./Container";
import Box from "./Box";
import FlexDiv from "./css/FlexDiv";
import P from "./css/P";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import ApexCharts from "react-apexcharts"; // Ensure you have this dependency installed
import axios from "axios";

// 도넛 그래프
const ApexChart = ({ totalData }) => {
  const series = [
    totalData.totalCorrectAddressChanges.reduce((a, b) => a + b, 0),
    totalData.totalIncorrectAddressChanges.reduce((a, b) => a + b, 0),
    totalData.totalAbnormalSpeech.reduce((a, b) => a + b, 0),
  ];

  const options = {
    chart: {
      type: "donut",
      width: "100%", // 차트의 너비를 100%로 설정
      height: 400, // 차트의 높이를 400px로 설정
    },
    labels: ["주소 변경 ⭕", "주소 변경 ❌", "비정상 발화"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    legend: {
      show: true,
      position: "right", // 범례 위치 설정 (오른쪽)
      labels: {
        colors: "#333", // 범례 글자 색상
      },
    },
  };

  return (
    <div id="chart">
      <ApexCharts options={options} series={series} type="donut" width="100%" />
    </div>
  );
};

// 꺾은선 그래프
const ApexChart2 = ({ labels, series }) => {
  const options = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "10-minute Interval Statistics",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: labels, // 10-minute interval labels
    },
  };

  return (
    <div>
      <div id="chart" style={{ width: "80%", margin: "0 auto" }}>
        <ApexCharts
          options={options}
          series={series}
          type="line"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

const Test = ({ isLoggedIn }) => {
  const [totalData, setTotalData] = useState({
    totalAbnormalSpeech: [],
    totalCorrectAddressChanges: [],
    totalIncorrectAddressChanges: [],
  });
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/user")
      .then((res) => {
        console.log(res.data); // Log the data to ensure it is correct

        const data = res.data;
        if (Array.isArray(data)) {
          const timeIntervalTotals = {
            abnormal_speech: {},
            correct_address_changes: {},
            incorrect_address_changes: {},
          };

          // Process data to aggregate by 10-minute intervals
          data.forEach((record) => {
            if (record.timestamp) {
              // Create a Date object from the timestamp
              const dateObj = new Date(record.timestamp);

              // Convert to local time and format the string
              const localDate = dateObj.toLocaleDateString("en-GB");
              const localTime = dateObj.toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              });
              const [hour, minute] = localTime.split(":");

              // Calculate 10-minute interval
              const interval = Math.floor(parseInt(minute, 10) / 10) * 10;
              const intervalLabel = `${localDate} ${hour}:${
                interval < 10 ? "0" + interval : interval
              }`;

              // Initialize label if not already present
              if (
                !timeIntervalTotals.abnormal_speech.hasOwnProperty(
                  intervalLabel
                )
              ) {
                timeIntervalTotals.abnormal_speech[intervalLabel] = 0;
                timeIntervalTotals.correct_address_changes[intervalLabel] = 0;
                timeIntervalTotals.incorrect_address_changes[intervalLabel] = 0;
              }

              // Update the totals
              timeIntervalTotals.abnormal_speech[intervalLabel] +=
                Number(record.abnormal_speech) || 0;
              timeIntervalTotals.correct_address_changes[intervalLabel] +=
                Number(record.correct_address_changes) || 0;
              timeIntervalTotals.incorrect_address_changes[intervalLabel] +=
                Number(record.incorrect_address_changes) || 0;
            }
          });

          const sortedLabels = Object.keys(
            timeIntervalTotals.abnormal_speech
          ).sort();
          setLabels(sortedLabels); // Sort labels for correct timeline
          setTotalData({
            totalAbnormalSpeech: sortedLabels.map(
              (label) => timeIntervalTotals.abnormal_speech[label]
            ),
            totalCorrectAddressChanges: sortedLabels.map(
              (label) => timeIntervalTotals.correct_address_changes[label]
            ),
            totalIncorrectAddressChanges: sortedLabels.map(
              (label) => timeIntervalTotals.incorrect_address_changes[label]
            ),
          });
        } else {
          console.error("Data is not an array");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Runs once on component mount

  const series = [
    {
      name: "주소 변경 ⭕",
      data: totalData.totalCorrectAddressChanges,
    },
    {
      name: "주소 변경 ❌",
      data: totalData.totalIncorrectAddressChanges,
    },
    {
      name: "비정상 발화",
      data: totalData.totalAbnormalSpeech,
    },
  ];

  return (
    <>
      <Wrapper isLoggedIn={isLoggedIn}>
        <Container>
          <ApexChart totalData={totalData} /> {/* Pass totalData as a prop */}
          <Box
            style={{
              background: "linear-gradient(to right, #9CC9FB, #008FFB)",
            }}
          >
            <FlexDiv>
              <P size="middle">주소 변경 ⭕</P>
              <FontAwesomeIcon icon={faChartLine} color="white" size="lg" />
            </FlexDiv>
            <FlexDiv>
              <P size="large">
                {totalData.totalCorrectAddressChanges.reduce(
                  (a, b) => a + b,
                  0
                )}
              </P>
            </FlexDiv>
          </Box>
          <Box
            style={{
              background: "linear-gradient(to right, #9FE3C0, #00E396 100%)",
            }}
          >
            <FlexDiv>
              <P size="middle">주소 변경 ❌</P>
              <FontAwesomeIcon icon={faChartLine} color="white" size="lg" />
            </FlexDiv>
            <FlexDiv>
              <P size="large">
                {totalData.totalIncorrectAddressChanges.reduce(
                  (a, b) => a + b,
                  0
                )}
              </P>
            </FlexDiv>
          </Box>
          <Box
            style={{
              background: "linear-gradient(to right, #FED4AB, #FEB019 40%)",
            }}
          >
            <FlexDiv>
              <P size="middle">비정상 발화</P>
              <FontAwesomeIcon icon={faChartLine} color="white" size="lg" />
            </FlexDiv>
            <FlexDiv>
              <P size="large">
                {totalData.totalAbnormalSpeech.reduce((a, b) => a + b, 0)}
              </P>
            </FlexDiv>
          </Box>
        </Container>
        <ApexChart2 labels={labels} series={series} />{" "}
        {/* Pass totalData as a prop */}
      </Wrapper>
    </>
  );
};

export default Test;
