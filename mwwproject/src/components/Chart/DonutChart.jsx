import React from "react";
import Chart from "react-apexcharts";
import useScenarioStatistics from "../../hooks/useScenarioStatistics";
import useEsdData from "../../hooks/useEsdData";

const DonutChart = () => {
  const { data } = useEsdData();
  const statistics = useScenarioStatistics(data);

  // 시나리오별 개수 비율 (총 개수 제외)
  const scenarioSeries = Object.entries(statistics)
    .filter(([scenarioName]) => scenarioName !== "총 개수") // "총 개수" 제외
    .map(([, stats]) => stats.total);

  // 성공, 전환, 포기, 실패 비율
  const performanceSeries = Object.entries(statistics).reduce(
    (acc, [, stats]) => {
      acc[0] += stats.success; // 성공
      acc[1] += stats.transfer; // 전환
      acc[2] += stats.abandon; // 포기
      acc[3] += stats.fail; // 실패
      return acc;
    },
    [0, 0, 0, 0] // 초기값
  );

  const scenarioOptions = {
    labels: Object.keys(statistics).filter(
      (scenarioName) => scenarioName !== "총 개수"
    ),
  };

  const performanceOptions = {
    labels: [
      "동화종료:성공",
      "동화종료:호전환",
      "동화종료:포기",
      "동화종료:실패",
    ],
  };

  return (
    <div
      id="chart"
      style={{ display: "flex", justifyContent: "space-around", width: "100%" }}
    >
      <div style={{ width: "40%" }}>
        <h3>시나리오 진입현황</h3>
        <Chart options={scenarioOptions} series={scenarioSeries} type="donut" />
      </div>
      <div style={{ width: "40%" }}>
        <h3>시나리오 결과현황</h3>
        <Chart
          options={performanceOptions}
          series={performanceSeries}
          type="donut"
        />
      </div>
    </div>
  );
};

export default DonutChart;
