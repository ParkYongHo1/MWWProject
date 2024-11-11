import { useState, useEffect } from "react";

const useScenarioStatistics = (data) => {
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    const scenarioStats = {
      보상담당자안내: {
        total: 0,
        success: 0,
        transfer: 0,
        abandon: 0,
        fail: 0,
      },
      각종서류발급문의: {
        total: 0,
        success: 0,
        transfer: 0,
        abandon: 0,
        fail: 0,
      },
      진료비내역서발급: {
        total: 0,
        success: 0,
        transfer: 0,
        abandon: 0,
        fail: 0,
      },
      계약조회: { total: 0, success: 0, transfer: 0, abandon: 0, fail: 0 },
    };

    data.forEach((item) => {
      const scenarioName = item.ScenarioName;
      if (scenarioStats[scenarioName]) {
        scenarioStats[scenarioName].total += 1;
        switch (item.ScenarioEndCode) {
          case "00":
            scenarioStats[scenarioName].fail += 1;
            break;
          case "01":
            scenarioStats[scenarioName].success += 1;
            break;
          case "02":
            scenarioStats[scenarioName].transfer += 1;
            break;
          case "03":
            scenarioStats[scenarioName].abandon += 1;
            break;
          default:
            break;
        }
      }
    });

    // 비율 계산
    for (const scenario in scenarioStats) {
      const total = scenarioStats[scenario].total;
      if (total > 0) {
        scenarioStats[scenario].successPercent = (
          (scenarioStats[scenario].success / total) *
          100
        ).toFixed(2);
        scenarioStats[scenario].transferPercent = (
          (scenarioStats[scenario].transfer / total) *
          100
        ).toFixed(2);
        scenarioStats[scenario].abandonPercent = (
          (scenarioStats[scenario].abandon / total) *
          100
        ).toFixed(2);
        scenarioStats[scenario].failPercent = (
          (scenarioStats[scenario].fail / total) *
          100
        ).toFixed(2);
      } else {
        scenarioStats[scenario].successPercent = "0.00";
        scenarioStats[scenario].transferPercent = "0.00";
        scenarioStats[scenario].abandonPercent = "0.00";
        scenarioStats[scenario].failPercent = "0.00";
      }
    }

    setStatistics(scenarioStats);
  }, [data]);

  return statistics;
};

export default useScenarioStatistics;
