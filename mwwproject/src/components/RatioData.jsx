// RatioData.js
import React from "react";

const RatioData = ({ statistics }) => {
  return (
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
          <th style={styles.th}>성공 비율 (%)</th>
          <th style={styles.th}>호전환 비율 (%)</th>
          <th style={styles.th}>포기 비율 (%)</th>
          <th style={styles.th}>실패 비율 (%)</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(statistics).map(([scenarioName, stats]) => (
          <tr key={scenarioName} style={styles.row}>
            <td style={styles.td}>{scenarioName}</td>
            <td style={styles.td}>
              <span style={{ fontSize: "20px", fontWeight: "700" }}>
                {stats.successPercent}
              </span>{" "}
              <span style={{ fontWeight: "700" }}>%</span>
            </td>
            <td style={styles.td}>
              <span style={{ fontSize: "20px", fontWeight: "700" }}>
                {stats.transferPercent}
              </span>{" "}
              <span style={{ fontWeight: "700" }}>%</span>
            </td>
            <td style={styles.td}>
              <span style={{ fontSize: "20px", fontWeight: "700" }}>
                {stats.abandonPercent}
              </span>{" "}
              <span style={{ fontWeight: "700" }}>%</span>
            </td>
            <td style={styles.td}>
              <span style={{ fontSize: "20px", fontWeight: "700" }}>
                {stats.failPercent}
              </span>{" "}
              <span style={{ fontWeight: "700" }}>%</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
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

export default RatioData;
