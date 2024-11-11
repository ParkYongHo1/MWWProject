import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useEsdData from "../../hooks/useEsdData";
import useLoadMessageLog from "../../hooks/useLoadMessageLog"; // useLoadMessageLog 추가
import ChatLog from "./ChatLog";

const DetailPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { scenarioName, status } = state || {};
  const { data } = useEsdData();

  const filteredData = data.filter(
    (item) =>
      item.ScenarioName === scenarioName &&
      ((status === "success" && item.ScenarioEndCode === "01") ||
        (status === "transfer" && item.ScenarioEndCode === "02") ||
        (status === "abandon" && item.ScenarioEndCode === "03") ||
        (status === "fail" && item.ScenarioEndCode === "00"))
  );

  const handleSessionClick = (sessionId) => {
    navigate(`/log?sessionId=${sessionId}`);
  };

  return (
    <div style={{ padding: "20px", margin: "0 auto", width: "70%" }}>
      <h2>
        {scenarioName} - {status} 데이터
      </h2>
      {filteredData.length > 0 ? (
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
                <th style={styles.th}>SessionId</th>
                <th style={styles.th}>Scenario Key</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr
                  key={item._id}
                  style={styles.row}
                  onClick={() => handleSessionClick(item.SessionID)}
                >
                  <td style={styles.td}>{item.SessionID}</td>
                  <td style={styles.td}>{item.ScenarioKey || "계약조회"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>해당 조건의 데이터가 없습니다.</p>
      )}
    </div>
  );
};

const styles = {
  th: { padding: "10px", border: "1px solid #ddd", textAlign: "center" },
  td: { padding: "8px", border: "1px solid #ddd", textAlign: "center" },
  row: { backgroundColor: "#f9f9f9", cursor: "pointer" },
};

export default DetailPage;
