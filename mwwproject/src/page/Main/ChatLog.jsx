import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import useLoadMessageLog from "../../hooks/useLoadMessageLog";

const ChatLog = () => {
  const { messageLog } = useLoadMessageLog(); // Get message log
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const sessionId = params.get("sessionId");
  const [messageName, setMessageName] = useState("");
  const [chatURL, setChatURL] = useState("");
  const today = new Date();
  const todayString = today.toISOString().split("T")[0];
  const fromDate = `${todayString} 00:00:00`;
  const toDate = `${todayString} 23:59:59`;

  useEffect(() => {
    if (messageLog.length > 0 && sessionId) {
      const foundMessage = messageLog.find(
        (item) => item.sessionId === sessionId
      );
      if (foundMessage) {
        setMessageName(foundMessage.name);
      }
    }
  }, [messageLog, sessionId]);

  useEffect(() => {
    const fetchChatbot = async () => {
      if (messageName) {
        try {
          const response = await axios.get(process.env.REACT_APP_CHATBOT_URL, {
            headers: {
              "coginsight-domain-id":
                process.env.REACT_APP_COGINSIGHT_DOMAIN_ID,
              "coginsight-api-key": process.env.REACT_APP_COGINSIGHT_API_KEY,
            },
            params: {
              fromDate: fromDate,
              toDate: toDate,
              userKey: messageName,
              _pageSize: 10000,
            },
          });
          // Prepend the URL to the chatURL
          const historyUrl = response.data.result[0]?._history_url;
          if (historyUrl) {
            setChatURL(`https://v2.coginsight.net${historyUrl}`);
          }
        } catch (error) {
          console.error("Error fetching chatbot data", error);
        }
      }
    };

    fetchChatbot();
  }, [messageName, fromDate, toDate]);

  return (
    <div>
      <h3>Session ID: {sessionId}</h3>
      {/* Display the chat URL as a clickable link */}
      {chatURL && (
        <a href={chatURL} target="_blank" rel="noopener noreferrer">
          챗봇 히스토리 보기
        </a>
      )}
    </div>
  );
};

export default ChatLog;
