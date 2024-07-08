const generateData = (type) => {
  if (type === "daily") {
    return {
      labels: [
        "2024-07-01",
        "2024-07-02",
        "2024-07-03",
        "2024-07-04",
        "2024-07-05",
      ],
      datasets: [
        {
          label: "여성 발화 통계",
          data: [10, 12, 14, 16, 18],
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "남성 발화 통계",
          data: [9, 11, 13, 15, 17],
          borderColor: "rgb(54, 162, 235)",
          backgroundColor: "rgba(54, 162, 235, 0.5)",
        },
        {
          label: "발화 히트 통계",
          data: [8, 10, 12, 14, 16],
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.5)",
        },
      ],
    };
  } else if (type === "monthly") {
    return {
      labels: ["1월", "2월", "3월", "4월", "5월"],
      datasets: [
        {
          label: "여성 발화 통계",
          data: [100, 200, 300, 400, 500],
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "남성 발화 통계",
          data: [90, 180, 270, 360, 450],
          borderColor: "rgb(54, 162, 235)",
          backgroundColor: "rgba(54, 162, 235, 0.5)",
        },
        {
          label: "발화 히트 통계",
          data: [80, 160, 240, 320, 400],
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.5)",
        },
      ],
    };
  } else if (type === "yearly") {
    return {
      labels: ["2020년", "2021년", "2022년", "2023년", "2024년"],
      datasets: [
        {
          label: "여성 발화 통계",
          data: [1000, 1200, 1400, 1600, 1800],
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "남성 발화 통계",
          data: [900, 1100, 1300, 1500, 1700],
          borderColor: "rgb(54, 162, 235)",
          backgroundColor: "rgba(54, 162, 235, 0.5)",
        },
        {
          label: "발화 히트 통계",
          data: [800, 1000, 1200, 1400, 1600],
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.5)",
        },
      ],
    };
  }
};

export default generateData;
