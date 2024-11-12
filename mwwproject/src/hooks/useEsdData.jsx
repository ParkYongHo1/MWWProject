import { useState, useEffect } from "react";
import axios from "axios";

const useEsdData = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleTest = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}`, {
          headers: {
            "coginsight-domain-id": `${process.env.REACT_APP_COGINSIGHT_DOMAIN_ID}`,
            "coginsight-api-key": `${process.env.REACT_APP_COGINSIGHT_API_KEY}`,
          },
          params: {
            _pageSize: 10000,
          },
        });

        // 오늘 날짜 구하기
        const today = new Date();
        const todayString = today.toISOString().split("T")[0]; // YYYY-MM-DD 형식

        // 오늘 날짜에 해당하는 데이터 필터링
        const filteredData = response.data.result.filter((item) => {
          const createdAtDate = new Date(item.createdAt)
            .toISOString()
            .split("T")[0];
          return createdAtDate === todayString;
        });

        setData(filteredData); // 필터링된 데이터 상태에 저장
      } catch (error) {
        console.error(error); // 에러 처리
      }
    };

    // 처음 데이터 로드
    handleTest();

    // 요청을 10초마다 실행하는 interval 설정
    const intervalId = setInterval(handleTest, 10000);

    // 컴포넌트 언마운트 시 interval 클리어
    return () => clearInterval(intervalId);
  }, []); // 빈 배열을 의존성으로 주어 컴포넌트가 마운트될 때만 실행

  return { data, error }; // data와 error를 반환
};

export default useEsdData;
