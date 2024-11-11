import { useNavigate } from "react-router-dom";
import useEsdData from "../hooks/useEsdData";
import useScenarioStatistics from "../hooks/useScenarioStatistics";
import RatioData from "./RatioData";

const TotalData = () => {
  const { data } = useEsdData();
  const statistics = useScenarioStatistics(data);
  const navigate = useNavigate();

  const handleNavigate = (scenarioName, status) => {
    navigate("/detail", { state: { scenarioName, status } });
  };

  return (
    <div style={{ padding: "20px", margin: "0 auto", width: "70%" }}>
      <h2>당일 데이터 시나리오 별 통계</h2>
      {data.length > 0 ? (
        <>
          <table
            style={{
              margin: "0 auto",
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f0f0f0" }}>
                <th style={styles.th}>시나리오명</th>
                <th style={styles.th}>누적갯수</th>
                <th style={styles.th}>성공</th>
                <th style={styles.th}>호전환</th>
                <th style={styles.th}>포기</th>
                <th style={styles.th}>실패</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(statistics).map(([scenarioName, stats]) => (
                <tr key={scenarioName} style={styles.row}>
                  <td style={styles.td}>{scenarioName}</td>
                  <td style={styles.td}>
                    <span style={{ fontSize: "20px", fontWeight: "700" }}>
                      {stats.total}
                    </span>
                  </td>
                  <td
                    style={styles.td}
                    onClick={() => handleNavigate(scenarioName, "success")}
                  >
                    <span style={{ fontSize: "20px", fontWeight: "700" }}>
                      {stats.success}
                    </span>
                  </td>
                  <td
                    style={styles.td}
                    onClick={() => handleNavigate(scenarioName, "transfer")}
                  >
                    <span style={{ fontSize: "20px", fontWeight: "700" }}>
                      {stats.transfer}
                    </span>
                  </td>
                  <td
                    style={styles.td}
                    onClick={() => handleNavigate(scenarioName, "abandon")}
                  >
                    <span style={{ fontSize: "20px", fontWeight: "700" }}>
                      {stats.abandon}
                    </span>
                  </td>
                  <td
                    style={styles.td}
                    onClick={() => handleNavigate(scenarioName, "fail")}
                  >
                    <span style={{ fontSize: "20px", fontWeight: "700" }}>
                      {stats.fail}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3 style={{ marginTop: "40px" }}>비율 통계</h3>
          <RatioData statistics={statistics} /> {/* RatioTable 컴포넌트 사용 */}
        </>
      ) : (
        <p>오늘 데이터가 없습니다.</p>
      )}
    </div>
  );
};

const styles = {
  th: { padding: "10px", border: "1px solid #ddd", textAlign: "center" },
  td: {
    padding: "8px",
    border: "1px solid #ddd",
    textAlign: "center",
    cursor: "pointer",
  },
  row: { backgroundColor: "#f9f9f9" },
};

export default TotalData;
