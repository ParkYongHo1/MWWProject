// components/TodayData.js
import React from "react";

const TodayData = ({ data, startIndex }) => {
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
          <th style={styles.th}>순번</th>
          <th style={styles.th}>SessionId</th>
          <th style={styles.th}>Scenario Key</th>
          <th style={styles.th}>Scenario Name</th>
          <th style={styles.th}>Channel</th>
          <th style={styles.th}>Call Use Time</th>
          <th style={styles.th}>Input Queue</th>
          <th style={styles.th}>Step</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr
            key={item._id}
            style={index % 2 === 0 ? styles.evenRow : styles.oddRow}
          >
            <td style={styles.td}>{startIndex + index + 1}</td>
            <td style={styles.td}>{item.SessionID}</td>
            <td style={styles.td}>
              {item.ScenarioKey == null ? "계약조회" : item.ScenarioKey}
            </td>
            <td style={styles.td}>{item.ScenarioName}</td>
            <td style={styles.td}>{item.Channel}</td>
            <td style={styles.td}>{item.CallUseTime}</td>
            <td style={styles.td}>{item.InputQueue}</td>
            <td style={styles.td}>{item.Step}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const styles = {
  th: { padding: "10px", border: "1px solid #ddd", textAlign: "left" },
  td: { padding: "8px", border: "1px solid #ddd" },
  evenRow: { backgroundColor: "#f9f9f9" },
  oddRow: { backgroundColor: "#fff" },
};

export default TodayData;
