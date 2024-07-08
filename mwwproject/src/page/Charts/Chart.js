import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { ResponsivePie } from "@nivo/pie";
import generateData from "./generateData";
import pieData from "./pieData";
import Wrapper from "./css/Wrapper";
import Button from "../../layout/css/Button";
import ButtonDiv from "./css/ButtonDIv";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
function Chart() {
  const [activeTab, setActiveTab] = useState("daily");
  const data = generateData(activeTab);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "통계 데이터",
      },
    },
  };

  return (
    <div>
      <ButtonDiv>
        <Button onClick={() => setActiveTab("daily")}>일별</Button>
        <Button onClick={() => setActiveTab("monthly")}>월별</Button>
        <Button onClick={() => setActiveTab("yearly")}>연별</Button>
      </ButtonDiv>
      <Wrapper>
        <div
          style={{
            width: "50%",
            backgroundColor: "white",

            margin: "0 auto",
            borderRadius: "5px",
            padding: "30px 30px",
          }}
        >
          <Line options={options} data={data} />
        </div>
        {/**  <div
          style={{
            width: "100%",
            height: "700px",
            backgroundColor: "white",
            margin: "0 auto",
            borderRadius: "5px",
          }}
        >
          <ResponsivePie data={pieData} />
        </div>*/}
      </Wrapper>
    </div>
  );
}

export default Chart;
