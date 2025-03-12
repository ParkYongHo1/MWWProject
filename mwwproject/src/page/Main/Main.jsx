// Main.js
import React from "react";
import TotalData from "../../components/TotalData";
import DountChart from "../../components/Chart/DonutChart";
function Main() {
  return (
    <div style={{ padding: "20px", margin: "0 auto", width: "90%" }}>
      <DountChart />
      <TotalData />
    </div>
  );
}

export default Main;
