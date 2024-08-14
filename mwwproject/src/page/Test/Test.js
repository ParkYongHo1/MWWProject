import React, { useState } from "react";
import Wrapper from "../Main/css/Wrapper";
import Container from "./Container";
import Box from "./Box";
import FlexDiv from "../Main/css/FlexDiv";
import P from "../Main/css/P";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import ApexCharts from "react-apexcharts"; // Ensure you have this dependency installed

// 도넛 그래프
const ApexChart = () => {
    const [series] = useState([
        // 여기 data에 항목별 수치
        { name: "주소 변경 ⭕", data: [50] },
        { name: "주소 변경 ❌", data: [15] },
        { name: "비정상 발화", data: [20] },
      ]);
    const [options] = useState({
        chart: {
        type: "donut",
        width: '100%', // 차트의 너비를 80%로 설정
        height: 400,  // 차트의 높이를 400px로 설정
        },
        labels : ["주소 변경 ⭕", "주소 변경 ❌", "비정상 발화"],
        responsive: [
        {
            breakpoint: 480,
            options: {
            chart: {
                width: 200
            },
            legend: {
                position: "bottom",
            },
            },
        },
        ],
        legend: {
            show : false,
            position: 'right', // 범례 위치 설정 (오른쪽)
            labels: {
              colors: '#333', // 범례 글자 색상
            },
          },
    });

    return (
        <div id="chart">
            <ApexCharts options={options} series={series.map(item => item.data[0])} type="donut" />
        </div>
    );
};

// 꺾은선 그래프
const ApexChart2 = () => {
    const [series] = useState([
        // 여기 data에 날짜별 수치
        { name: "주소 변경 ⭕", data: [10, 41, 35, 51, 49, 62, 69, 91, 148] },
        { name: "주소 변경 ❌", data: [15, 55, 54, 10, 13, 23, 24, 32, 18] },
        { name: "비정상 발화", data: [5, 19, 30, 2, 15, 24, 28, 31, 40] }
    ]);

    const [options] = useState({
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: 'Daily Statistics',
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        xaxis: {
            // 여기에 날짜
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        }
    });

    return (
        <div>
            <div id="chart" style={{ width: '80%', margin: '0 auto' }}>
                <ApexCharts options={options} series={series} height={350} type="line" />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

const Test = () => {
  return (
    <>
      <Wrapper isLoggedIn={true}>
        <Container>
            <ApexChart /> {/* Render the ApexChart component */}
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
              <P size="large">0</P>
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
              <P size="large">0</P>
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
              <P size="large">0</P>
            </FlexDiv>
          </Box>
        </Container>
        <ApexChart2 /> {/* Render the ApexChart2 component */}
      </Wrapper>
    </>
  );
};

export default Test;
