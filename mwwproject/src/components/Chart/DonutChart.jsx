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
  const performanceSeries = Object.entries(statistics)
    .filter(([scenarioName]) => scenarioName !== "총 개수")
    .reduce(
      (acc, [, stats]) => {
        acc[0] += stats.success; // 성공
        acc[1] += stats.fail; // 전환
        acc[2] += stats.abandon; // 포기
        acc[3] += stats.noResponse; // 무응답
        acc[4] += stats.essential; // 데이터 필수값 누락
        acc[5] += stats.done; // XO에서 완료처리
        acc[6] += stats.over; // 캠페인 기간 Over
        acc[7] += stats.birth; // 생년월일 인증 오류
        acc[8] += stats.notInfo; // 상세조회시 결과없음
        acc[9] += stats.errInfo; // 전문오류
        acc[10] += stats.errMWW; // coginsight 다이얼로그 오류
        acc[11] += stats.emergency; // 시나리오 긴급 정지 상태
        return acc;
      },
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );

  const scenarioOptions = {
    labels: Object.keys(statistics).filter(
      (scenarioName) => scenarioName !== "총 개수"
    ),
  };

  const performanceOptions = {
    labels: [
      "통화성공",
      "실패",
      "포기",
      "무응답",
      "데이터 필수값 누락",
      "XO에서 완료처리",
      "캠페인 기간 Over",
      "생년월일 인증 오류",
      "상세조회시 결과없음",
      "전문오류",
      "coginsight 다이얼로그 오류",
      "시나리오 긴급 정지 상태",
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
