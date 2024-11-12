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
    <>
      <h2>시나리오 사용 및 결과 현황</h2>
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
                      {stats.total}{" "}
                    </span>
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: "700",
                        color: "#0000ff5e",
                      }}
                    >
                      ({stats.totalPercent}%)
                    </span>
                  </td>
                  <td
                    style={styles.td}
                    onClick={() => handleNavigate(scenarioName, "success")}
                  >
                    <span style={{ fontSize: "20px", fontWeight: "700" }}>
                      {stats.success}{" "}
                    </span>
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: "700",
                        color: "#0000ff5e",
                      }}
                    >
                      ({stats.successPercent}%)
                    </span>
                  </td>
                  <td
                    style={styles.td}
                    onClick={() => handleNavigate(scenarioName, "transfer")}
                  >
                    <span style={{ fontSize: "20px", fontWeight: "700" }}>
                      {stats.transfer}{" "}
                    </span>
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: "700",
                        color: "#0000ff5e",
                      }}
                    >
                      ({stats.transferPercent}%)
                    </span>
                  </td>
                  <td
                    style={styles.td}
                    onClick={() => handleNavigate(scenarioName, "abandon")}
                  >
                    <span style={{ fontSize: "20px", fontWeight: "700" }}>
                      {stats.abandon}{" "}
                    </span>
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: "700",
                        color: "#0000ff5e",
                      }}
                    >
                      ({stats.abandonPercent}%)
                    </span>
                  </td>
                  <td
                    style={styles.td}
                    onClick={() => handleNavigate(scenarioName, "fail")}
                  >
                    <span style={{ fontSize: "20px", fontWeight: "700" }}>
                      {stats.fail}{" "}
                    </span>
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: "700",
                        color: "#0000ff5e",
                      }}
                    >
                      ({stats.failPercent}%)
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>오늘 데이터가 없습니다.</p>
      )}
    </>
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
