// useLoadMessageLog.js
import { useEffect, useState } from "react";
import axios from "axios";

const useLoadMessageLog = () => {
  const [messageLog, setMessageLog] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleTest = async () => {
      if (error) return; // Prevent making the request if there's an existing error
      const today = new Date();
      const todayString = today.toISOString().split("T")[0]; // YYYY-MM-DD
      const fromDate = `${todayString} 00:00:00`;
      const toDate = `${todayString} 23:59:59`;
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_MESSAGE_LOG}`,
          {
            headers: {
              "coginsight-domain-id":
                process.env.REACT_APP_COGINSIGHT_DOMAIN_ID,
              "coginsight-api-key": process.env.REACT_APP_COGINSIGHT_API_KEY,
            },
            params: { fromDate, toDate, _pageSize: 10000 },
          }
        );
        console.log(response.data);
        const uniqueSessionIds = new Set();
        const filteredLogs = response.data.result.filter((item) => {
          if (!uniqueSessionIds.has(item.sessionId)) {
            uniqueSessionIds.add(item.sessionId);
            return true;
          }
          return false;
        });
        setMessageLog(filteredLogs);
      } catch (error) {
        console.error(error);
        setError("데이터를 불러오는 데 실패했습니다.");
      }
    };
    handleTest();
  }, []);

  return { messageLog };
};

export default useLoadMessageLog;
