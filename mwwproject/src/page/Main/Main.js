// Main.js
import React, { useState } from "react";
import useEsdData from "../../hooks/useEsdData";
import Pagination from "../../components/Pagination";
import TotalData from "../../components/TotalData";
import TodayData from "../../components/TodayData";
import useLoadMessageLog from "../../hooks/useLoadMessageLog";

function Main() {
  const { data, error } = useEsdData();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const test = useLoadMessageLog();
  if (error) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다: {error}</div>;
  }
  console.log("test==" + test);

  // 페이지에 맞는 데이터 계산
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <>
      <TotalData />
      <div style={{ padding: "20px", margin: "0 auto", width: "70%" }}>
        <h2>당일 데이터 통계</h2>
        {data.length > 0 ? (
          <>
            <TodayData data={currentData} startIndex={startIndex} />
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <p>오늘 데이터가 없습니다.</p>
        )}
      </div>
    </>
  );
}

export default Main;
