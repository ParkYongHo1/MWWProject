import { useState, useEffect } from "react";

const useScenarioStatistics = (data) => {
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    const scenarioStats = {
      해피콜: {
        total: 0,
        success: 0,
        fail: 0,
        abandon: 0,
        noResponse: 0,
        essential: 0,
        done: 0,
        over: 0,
        birth: 0,
        notInfo: 0,
      },
      실효예고: {
        total: 0,
        success: 0,
        fail: 0,
        abandon: 0,
        noResponse: 0,
        essential: 0,
        done: 0,
        over: 0,
        birth: 0,
        notInfo: 0,
      },
      월대체보험안내: {
        total: 0,
        success: 0,
        fail: 0,
        abandon: 0,
        noResponse: 0,
        essential: 0,
        done: 0,
        over: 0,
        birth: 0,
        notInfo: 0,
      },
      안내장반송: {
        total: 0,
        success: 0,
        fail: 0,
        abandon: 0,
        noResponse: 0,
        essential: 0,
        done: 0,
        over: 0,
        birth: 0,
        notInfo: 0,
      },
      스마트레터: {
        total: 0,
        success: 0,
        fail: 0,
        abandon: 0,
        noResponse: 0,
        essential: 0,
        done: 0,
        over: 0,
        birth: 0,
        notInfo: 0,
      },
      "총 개수": {
        total: 0,
        success: 0,
        fail: 0,
        abandon: 0,
        noResponse: 0,
        essential: 0,
        done: 0,
        over: 0,
        birth: 0,
        notInfo: 0,
      },
    };

    data.forEach((item) => {
      const scenarioName = item.CampaignName;
      if (scenarioStats[scenarioName]) {
        scenarioStats[scenarioName].total += 1;
        scenarioStats["총 개수"].total += 1;
        switch (item.ScenarioEndResult2) {
          case "00":
            scenarioStats[scenarioName].success += 1;
            scenarioStats["총 개수"].success += 1; // 통화성공
            break;
          case "01":
            scenarioStats[scenarioName].fail += 1;
            scenarioStats["총 개수"].fail += 1; // 실패
            break;
          case "02":
            scenarioStats[scenarioName].abandon += 1;
            scenarioStats["총 개수"].abandon += 1; // 포기
            break;
          case "03":
            scenarioStats[scenarioName].noResponse += 1;
            scenarioStats["총 개수"].noResponse += 1; // 무응답
            break;
          case "04":
            scenarioStats[scenarioName].essential += 1;
            scenarioStats["총 개수"].essential += 1; // 데이터 필수값 누락
            break;
          case "05":
            scenarioStats[scenarioName].done += 1;
            scenarioStats["총 개수"].done += 1; // XO에서 완료처리
            break;
          case "06":
            scenarioStats[scenarioName].over += 1;
            scenarioStats["총 개수"].over += 1; // 캠페인 기간 Over
            break;
          case "07":
            scenarioStats[scenarioName].birth += 1;
            scenarioStats["총 개수"].birth += 1; // 생년월일 인증 오류
            break;
          case "08":
            scenarioStats[scenarioName].notInfo += 1;
            scenarioStats["총 개수"].notInfo += 1; // 상세조회시 결과없음
            break;

          default:
            break;
        }
      }
    });

    // 비율 계산
    const totalOverall = scenarioStats["총 개수"].total; // 총 개수의 total을 참조

    for (const scenario in scenarioStats) {
      const total = scenarioStats[scenario].total;

      if (total > 0) {
        scenarioStats[scenario].successPercent = (
          (scenarioStats[scenario].success / total) *
          100
        ).toFixed(1);
        scenarioStats[scenario].failPercent = (
          (scenarioStats[scenario].fail / total) *
          100
        ).toFixed(1);
        scenarioStats[scenario].abandonPercent = (
          (scenarioStats[scenario].abandon / total) *
          100
        ).toFixed(1);
        scenarioStats[scenario].noResponsePercent = (
          (scenarioStats[scenario].noResponse / total) *
          100
        ).toFixed(1);
        scenarioStats[scenario].essentialPercent = (
          (scenarioStats[scenario].essential / total) *
          100
        ).toFixed(1);
        scenarioStats[scenario].donePercent = (
          (scenarioStats[scenario].done / total) *
          100
        ).toFixed(1);
        scenarioStats[scenario].overPercent = (
          (scenarioStats[scenario].over / total) *
          100
        ).toFixed(1);
        scenarioStats[scenario].birthPercent = (
          (scenarioStats[scenario].birth / total) *
          100
        ).toFixed(1);
        scenarioStats[scenario].notInfoPercent = (
          (scenarioStats[scenario].notInfo / total) *
          100
        ).toFixed(1);
      } else {
        scenarioStats[scenario].successPercent = "0.0";
        scenarioStats[scenario].failPercent = "0.0";
        scenarioStats[scenario].abandonPercent = "0.0";
        scenarioStats[scenario].noResponsePercent = "0.0";
        scenarioStats[scenario].essentialPercent = "0.0";
        scenarioStats[scenario].donePercent = "0.0";
        scenarioStats[scenario].overPercent = "0.0";
        scenarioStats[scenario].birthPercent = "0.0";
        scenarioStats[scenario].notInfoPercent = "0.0";
      }

      // 총 개수에 대한 퍼센트 계산
      if (totalOverall > 0) {
        scenarioStats[scenario].totalPercent = (
          (total / totalOverall) *
          100
        ).toFixed(1);
      } else {
        scenarioStats[scenario].totalPercent = "0.0";
      }
    }

    setStatistics(scenarioStats);
  }, [data]);

  return statistics;
};

export default useScenarioStatistics;
