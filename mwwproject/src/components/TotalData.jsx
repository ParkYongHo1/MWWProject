import useEsdData from "../hooks/useEsdData";
import useScenarioStatistics from "../hooks/useScenarioStatistics";

const TotalData = () => {
  const { data } = useEsdData();
  const statistics = useScenarioStatistics(data);

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
                <th style={styles.th}>통화성공</th>
                <th style={styles.th}>실패</th>
                <th style={styles.th}>포기</th>
                <th style={styles.th}>무응답</th>
                <th style={styles.th}>데이터 필수값 누락</th>
                <th style={styles.th}>XO에서 완료처리</th>
                <th style={styles.th}>캠페인 기간 Over</th>
                <th style={styles.th}>생년월일 인증 오류</th>
                <th style={styles.th}>상세조회시 결과없음</th>
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
                  <td style={styles.td}>
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
                  <td style={styles.td}>
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
                  <td style={styles.td}>
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
                  <td style={styles.td}>
                    <span style={{ fontSize: "20px", fontWeight: "700" }}>
                      {stats.noResponse}{" "}
                    </span>
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: "700",
                        color: "#0000ff5e",
                      }}
                    >
                      ({stats.noResponsePercent}%)
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span style={{ fontSize: "20px", fontWeight: "700" }}>
                      {stats.essential}{" "}
                    </span>
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: "700",
                        color: "#0000ff5e",
                      }}
                    >
                      ({stats.essentialPercent}%)
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span style={{ fontSize: "20px", fontWeight: "700" }}>
                      {stats.done}{" "}
                    </span>
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: "700",
                        color: "#0000ff5e",
                      }}
                    >
                      ({stats.donePercent}%)
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span style={{ fontSize: "20px", fontWeight: "700" }}>
                      {stats.over}{" "}
                    </span>
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: "700",
                        color: "#0000ff5e",
                      }}
                    >
                      ({stats.overPercent}%)
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span style={{ fontSize: "20px", fontWeight: "700" }}>
                      {stats.birth}{" "}
                    </span>
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: "700",
                        color: "#0000ff5e",
                      }}
                    >
                      ({stats.birthPercent}%)
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span style={{ fontSize: "20px", fontWeight: "700" }}>
                      {stats.notInfo}{" "}
                    </span>
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: "700",
                        color: "#0000ff5e",
                      }}
                    >
                      ({stats.notInfoPercent}%)
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
  },
  row: { backgroundColor: "#f9f9f9" },
};

export default TotalData;
