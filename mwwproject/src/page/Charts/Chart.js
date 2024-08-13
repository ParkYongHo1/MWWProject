import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import GenerateData from "./GenerateData";
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
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    // Fetch data whenever activeTab changes
    const fetchData = async () => {
      const data = await GenerateData(activeTab);
      setChartData(data);
    };

    fetchData();
  }, [activeTab]);

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
          <Line options={options} data={chartData} />
        </div>
      </Wrapper>
    </div>
  );
}

export default Chart;
