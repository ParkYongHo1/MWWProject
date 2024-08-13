import axios from "axios";

const GenerateData = async (type) => {
  try {
    const response = await axios.get("http://localhost:8080/api/user");
    const data = response.data;
    console.log("data ===", data);

    let labels = [];
    let timeIntervalTotals = {
      abnormal_speech: [],
      incorrect_address_changes: [],
      correct_address_changes: [],
    };

    // Process data to aggregate by 10-minute intervals
    data.forEach((record) => {
      if (record.timestamp) {
        // Create a Date object from the timestamp
        const dateObj = new Date(record.timestamp);

        // Convert to local time and format the string
        const localDate = dateObj.toLocaleDateString("en-GB");
        const localTime = dateObj.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        });
        const [hour, minute] = localTime.split(":");

        // Calculate 10-minute interval
        const interval = Math.floor(parseInt(minute, 10) / 10) * 10;
        const intervalLabel = `${localDate} ${hour}:${
          interval < 10 ? "0" + interval : interval
        }`;

        // Initialize label if not already present
        if (!labels.includes(intervalLabel)) {
          labels.push(intervalLabel);
          timeIntervalTotals["abnormal_speech"].push(0);
          timeIntervalTotals["incorrect_address_changes"].push(0);
          timeIntervalTotals["correct_address_changes"].push(0);
        }

        // Find the index for the current label
        const index = labels.indexOf(intervalLabel);

        // Update the totals
        timeIntervalTotals["abnormal_speech"][index] +=
          Number(record.abnormal_speech) || 0;
        timeIntervalTotals["incorrect_address_changes"][index] +=
          Number(record.incorrect_address_changes) || 0;
        timeIntervalTotals["correct_address_changes"][index] +=
          Number(record.correct_address_changes) || 0;
      }
    });

    // Construct datasets for chart
    const datasets = [
      {
        label: "주소 변경 ⭕",
        data: timeIntervalTotals["correct_address_changes"],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "주소 변경 ❌",
        data: timeIntervalTotals["incorrect_address_changes"],
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
      {
        label: "비정상 발화",
        data: timeIntervalTotals["abnormal_speech"],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ];

    if (type === "daily") {
      return {
        labels,
        datasets,
      };
    } else {
      console.warn("Unsupported type:", type);
      return {
        labels: [],
        datasets: [],
      };
    }
  } catch (error) {
    console.error("Data fetching error:", error);
    return {
      labels: [],
      datasets: [],
    };
  }
};

export default GenerateData;
